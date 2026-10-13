const VISITOR_KEY = "alshorouk.visitor";

function visitorId() {
  try {
    const existing = localStorage.getItem(VISITOR_KEY);
    if (existing) return existing;
    const next = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, next);
    return next;
  } catch {
    return "anonymous-visitor";
  }
}

export function trackVisit(path) {
  if (!path || path.startsWith("/admin") || path.startsWith("/api")) return;
  const payload = JSON.stringify({ path, visitorId: visitorId() });
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}

export function loadTrafficSummary(range) {
  const query = range ? `?range=${encodeURIComponent(range)}` : "";
  return fetch(`/api/track/summary${query}`).then((response) => {
    if (!response.ok) throw new Error("summary");
    return response.json();
  });
}
