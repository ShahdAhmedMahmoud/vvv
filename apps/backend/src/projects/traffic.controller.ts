import { Body, Controller, Get, Post, Query, Req } from "@nestjs/common";
import type { Request } from "express";
import { clientIp, TrafficService } from "./traffic.service";

@Controller("api/track")
export class TrafficController {
  constructor(private readonly traffic: TrafficService) {}

  @Post()
  track(@Req() req: Request, @Body() body: Record<string, unknown>) {
    return this.traffic.record(body || {}, clientIp(req));
  }

  @Get("summary")
  summary(@Query("range") range?: string) {
    return this.traffic.summary(range || "all");
  }
}
