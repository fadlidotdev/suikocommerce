// https://usehooks-ts.com/react-hook/use-window-size

import {useState} from "react";
import useEventListener from "./useEventListeners";
import {useIsomorphicLayoutEffect} from "./useIsomorphicLayoutEffect";

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const onSize = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEventListener("resize", onSize);

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    onSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return size;
};

export default useWindowSize;
