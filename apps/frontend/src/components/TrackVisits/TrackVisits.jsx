import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackVisit } from "../../services/track";

export default function TrackVisits() {
  const location = useLocation();

  useEffect(() => {
    trackVisit(location.pathname);
  }, [location.pathname]);

  return null;
}
