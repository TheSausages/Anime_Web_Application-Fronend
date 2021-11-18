import { useLayoutEffect, useState } from 'react';

/**
 * Small method that rerenders the screen each time the resolution is chained.
 * Note! Should be used once!
 * @returns Size of the current screen.
 */
export default function Rerender() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}