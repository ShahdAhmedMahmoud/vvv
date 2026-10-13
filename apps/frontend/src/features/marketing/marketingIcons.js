import {
  Award,
  BadgeCheck,
  Blocks,
  Building2,
  Calendar,
  ClipboardList,
  Forklift,
  Hammer,
  HardHat,
  Route,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";

/** Lucide icon lookup by stable string key (JSON-safe for CMS). */
export const MARKETING_ICONS = {
  Building2,
  Award,
  Users,
  Calendar,
  Wrench,
  ShieldCheck,
  Forklift,
  Blocks,
  HardHat,
  BadgeCheck,
  ClipboardList,
  Hammer,
  Route,
};

export const ABOUT_FEATURE_ICON_OPTIONS = [
  "Building2",
  "Award",
  "Users",
  "Calendar",
  "Wrench",
  "ShieldCheck",
];

export const ABOUT_STAT_ICON_OPTIONS = [
  "Users",
  "Forklift",
  "Blocks",
  "HardHat",
  "BadgeCheck",
];

export const SERVICE_ICON_OPTIONS = [
  "HardHat",
  "ClipboardList",
  "Building2",
  "Hammer",
  "Route",
  "Wrench",
];

export function resolveMarketingIcon(name, fallback = Building2) {
  return MARKETING_ICONS[name] || fallback;
}
