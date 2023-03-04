import { useEffect, useState } from 'react';
import { useMeasure } from 'react-use';
import { throttle } from 'throttle-debounce';

const ITEM_MIN_WIDTH = 250 as const;

export const useSlider = ({ items }: { items: unknown[] }) => {
  const [containerElementRef, { width }] = useMeasure();

  const [visibleItemCount, setVisibleItemCount] = useState(1);
  const [_slideIndex, setSlideIndex] = useState(0);
  const slideIndex = Math.min(Math.max(0, _slideIndex), items.length - 1);

  useEffect(() => {
    const updateVisibleItemCount = throttle(500, () => {
      setVisibleItemCount(() => {
        return Math.max(Math.floor(width / ITEM_MIN_WIDTH), 1);
      });
    });
    updateVisibleItemCount();
  }, [width]);

  return {
    containerElementRef,
    setSlideIndex,
    slideIndex,
    visibleItemCount,
  };
};
