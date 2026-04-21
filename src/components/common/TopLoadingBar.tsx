import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TopLoadingBar = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setProgress(15);

    const t1 = setTimeout(() => setProgress(45), 100);
    const t2 = setTimeout(() => setProgress(75), 250);
    const t3 = setTimeout(() => setProgress(100), 450);
    const t4 = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent pointer-events-none">
      <div
        className="h-full bg-primary shadow-[0_0_10px_hsl(var(--primary))] transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default TopLoadingBar;
