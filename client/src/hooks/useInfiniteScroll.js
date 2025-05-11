import { useEffect, useRef } from "react";
import throttle from "lodash.throttle";

export default function useInfiniteScroll(loadMore, enabled = true, threshold = 0.8) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const onScroll = throttle(() => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      const ratio = (scrollTop + clientHeight) / scrollHeight;

      if (ratio >= threshold && !firedRef.current) {
        firedRef.current = true;
        loadMore();
      }
      if (ratio < threshold) firedRef.current = false; 
    }, 250);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loadMore, enabled, threshold]);
}
