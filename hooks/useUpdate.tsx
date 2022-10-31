import { useEffect, useRef } from "react";

export const useUpdate = (callback: () => void, watch: any[]) => {
  const init = useRef(true);
  useEffect(() => {
    if (init.current) {
      init.current = false;
      return;
    }
    callback();
  }, watch);
};
