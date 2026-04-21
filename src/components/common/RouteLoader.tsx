import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";

const RouteLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!loading) return null;

  return <Loading fullScreen message="Loading page..." />;
};

export default RouteLoader;
