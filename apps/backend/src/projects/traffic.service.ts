import { Injectable } from "@nestjs/common";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type { Request } from "express";
import { summarize, type Visit } from "./traffic.summary";

const MAX_EVENTS = 20_000;
const DEDUPE_MS = 15 * 60 * 1000;
// Visits stay on disk so a backend restart does not wipe the counts.
const FILE = join(process.cwd(), "data", "traffic.json");

type CountryHit = { country: string; countryCode: string };

@Injectable()
export class TrafficService {
  private events: Visit[] = this.read();
  private gate: Promise<void> = Promise.resolve();
  private geoCache = new Map<string, CountryHit>();

  record(body: Record<string, unknown>, ip: string) {
    const path = cleanPath(body.path);
    const visitorId = cleanVisitor(body.visitorId);
    if (!path || !visitorId) return Promise.resolve({ ok: false });

    const run = this.gate.then(() => this.writeVisit(path, visitorId, ip));
    this.gate = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  }

  summary(range: string) {
    return summarize(this.events, range);
  }

  private async writeVisit(path: string, visitorId: string, ip: string) {
    const now = Date.now();
    const recent = this.events.find(
      (event) => event.path === path && event.visitorId === visitorId && now - event.at < DEDUPE_MS,
    );
    if (recent) return { ok: true, duplicate: true };

    const place = await this.countryFor(ip);
    const project = path.match(/^\/projects\/([^/]+)$/);
    this.events.push({
      at: now,
      path,
      visitorId,
      country: place.country,
      countryCode: place.countryCode,
      projectId: project ? decodeURIComponent(project[1]) : null,
    });
    if (this.events.length > MAX_EVENTS) {
      this.events.splice(0, this.events.length - MAX_EVENTS);
    }
    this.save();
    return { ok: true };
  }

  private async countryFor(ip: string): Promise<CountryHit> {
    const address = ip.replace(/^::ffff:/, "");
    if (!isPublicIp(address)) return { country: "شبكة داخلية", countryCode: "LAN" };
    const cached = this.geoCache.get(address);
    if (cached) return cached;

    const hit = await lookupCountry(address);
    this.geoCache.set(address, hit);
    return hit;
  }

  private read(): Visit[] {
    try {
      const parsed = JSON.parse(readFileSync(FILE, "utf8")) as Visit[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private save() {
    mkdirSync(join(process.cwd(), "data"), { recursive: true });
    writeFileSync(FILE, JSON.stringify(this.events));
  }
}

export function clientIp(req: Request) {
  const forwarded = req.headers["x-forwarded-for"];
  const raw = Array.isArray(forwarded) ? forwarded[forwarded.length - 1] : forwarded;
  const parts = (raw || "").split(",").map((part) => part.trim()).filter(Boolean);
  const last = parts[parts.length - 1] || "";
  const address = (last || req.socket.remoteAddress || "").replace(/^::ffff:/, "");
  return address;
}

function cleanPath(value: unknown) {
  if (typeof value !== "string") return "";
  const path = value.trim();
  if (!path.startsWith("/") || path.startsWith("//") || path.length > 180) return "";
  if (path.startsWith("/admin") || path.startsWith("/api")) return "";
  if (!/^\/[A-Za-z0-9\-._~/%]*$/.test(path)) return "";
  return path;
}

function cleanVisitor(value: unknown) {
  if (typeof value !== "string") return "";
  const id = value.trim();
  if (!/^[A-Za-z0-9-]{8,80}$/.test(id)) return "";
  return id;
}

function isPublicIp(ip: string) {
  if (!ip || ip === "::1" || ip === "127.0.0.1") return false;
  if (ip.startsWith("10.") || ip.startsWith("192.168.") || ip.startsWith("169.254.")) return false;
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)) return false;
  if (ip.toLowerCase().startsWith("fc") || ip.toLowerCase().startsWith("fd") || ip.toLowerCase().startsWith("fe80")) return false;
  return isIp(ip);
}

function isIp(ip: string) {
  if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(ip)) {
    return ip.split(".").every((part) => Number(part) <= 255);
  }
  return ip.includes(":") && /^[0-9a-fA-F:]+$/.test(ip);
}

async function lookupCountry(ip: string): Promise<CountryHit> {
  try {
    const response = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}?lang=ar`, {
      signal: AbortSignal.timeout(2500),
    });
    if (!response.ok) return unknown();
    const data = (await response.json()) as { success?: boolean; country?: string; country_code?: string };
    if (!data.success || !data.country || !data.country_code) return unknown();
    return { country: data.country, countryCode: data.country_code };
  } catch {
    return unknown();
  }
}

function unknown(): CountryHit {
  return { country: "غير معروف", countryCode: "ZZ" };
}
