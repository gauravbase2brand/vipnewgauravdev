import { useEffect, useState } from "react";

const usePageLoadDelay = (delay = 3000) => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    const handlePageLoad = () => {
      setTimeout(() => {
        setIsPageLoaded(true);
      }, delay);
    };

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
    }

    return () => window.removeEventListener("load", handlePageLoad);
  }, [delay]);

  return isPageLoaded;
};

export default usePageLoadDelay;
