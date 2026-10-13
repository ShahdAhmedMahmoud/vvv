export type Visit = {
  at: number;
  path: string;
  visitorId: string;
  country: string;
  countryCode: string;
  projectId: string | null;
};

export type CountryStat = {
  country: string;
  code: string;
  visitors: number;
  views: number;
};

export type PageStat = {
  path: string;
  visitors: number;
  views: number;
  countries: CountryStat[];
};

export type ProjectStat = {
  projectId: string;
  visitors: number;
  views: number;
  countries: CountryStat[];
};

export type CountryTraffic = CountryStat & {
  topPage: { path: string; visitors: number; views: number } | null;
};

const RANGES: Record<string, number> = {
  "1d": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
};

export function summarize(events: Visit[], range: string, now = Date.now()) {
  const windowMs = RANGES[range];
  const rows = windowMs ? events.filter((event) => now - event.at <= windowMs) : events;
  const pages = groupPages(rows);
  const projects = groupProjects(rows);
  const countries = groupCountries(rows);
  const topPage = pages[0] ? { path: pages[0].path, visitors: pages[0].visitors, views: pages[0].views } : null;

  return {
    range: RANGES[range] ? range : "all",
    totals: {
      visitors: new Set(rows.map((event) => event.visitorId)).size,
      views: rows.length,
    },
    topPage,
    pages,
    projects,
    countries,
  };
}

function visitorsOf(rows: Visit[]) {
  return new Set(rows.map((event) => event.visitorId)).size;
}

function countriesOf(rows: Visit[]): CountryStat[] {
  const groups = new Map<string, Visit[]>();
  for (const event of rows) {
    const key = `${event.countryCode}|${event.country}`;
    const list = groups.get(key);
    if (list) list.push(event);
    else groups.set(key, [event]);
  }
  return [...groups.values()]
    .map((list) => ({
      country: list[0].country,
      code: list[0].countryCode,
      visitors: visitorsOf(list),
      views: list.length,
    }))
    .sort((a, b) => b.visitors - a.visitors || b.views - a.views);
}

function groupPages(rows: Visit[]): PageStat[] {
  const groups = new Map<string, Visit[]>();
  for (const event of rows) {
    const list = groups.get(event.path);
    if (list) list.push(event);
    else groups.set(event.path, [event]);
  }
  return [...groups.entries()]
    .map(([path, list]) => ({
      path,
      visitors: visitorsOf(list),
      views: list.length,
      countries: countriesOf(list),
    }))
    .sort((a, b) => b.visitors - a.visitors || b.views - a.views);
}

function groupProjects(rows: Visit[]): ProjectStat[] {
  const groups = new Map<string, Visit[]>();
  for (const event of rows) {
    if (!event.projectId) continue;
    const list = groups.get(event.projectId);
    if (list) list.push(event);
    else groups.set(event.projectId, [event]);
  }
  return [...groups.entries()]
    .map(([projectId, list]) => ({
      projectId,
      visitors: visitorsOf(list),
      views: list.length,
      countries: countriesOf(list),
    }))
    .sort((a, b) => b.visitors - a.visitors || b.views - a.views);
}

function groupCountries(rows: Visit[]): CountryTraffic[] {
  const groups = new Map<string, Visit[]>();
  for (const event of rows) {
    const key = `${event.countryCode}|${event.country}`;
    const list = groups.get(key);
    if (list) list.push(event);
    else groups.set(key, [event]);
  }
  return [...groups.values()]
    .map((list) => {
      const pages = groupPages(list);
      const top = pages[0];
      return {
        country: list[0].country,
        code: list[0].countryCode,
        visitors: visitorsOf(list),
        views: list.length,
        topPage: top ? { path: top.path, visitors: top.visitors, views: top.views } : null,
      };
    })
    .sort((a, b) => b.visitors - a.visitors || b.views - a.views);
}
