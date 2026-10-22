import { useCallback, useRef, useState } from "react";

export function useDragScroll() {
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const movedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const element = event.currentTarget;
    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    startScrollLeftRef.current = element.scrollLeft;
    movedRef.current = false;
    setIsDragging(true);
    element.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (!isDragging || pointerIdRef.current !== event.pointerId) {
      return;
    }

    const element = event.currentTarget;
    const deltaX = event.clientX - startXRef.current;

    if (Math.abs(deltaX) > 4) {
      movedRef.current = true;
    }

    element.scrollLeft = startScrollLeftRef.current - deltaX;
  }, [isDragging]);

  const endDrag = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (pointerIdRef.current !== event.pointerId) {
      return;
    }

    const element = event.currentTarget;
    if (element.hasPointerCapture(event.pointerId)) {
      element.releasePointerCapture(event.pointerId);
    }
    pointerIdRef.current = null;
    setIsDragging(false);
  }, []);

  const onClickCapture = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (movedRef.current) {
      event.preventDefault();
      event.stopPropagation();
      movedRef.current = false;
    }
  }, []);

  return {
    isDragging,
    dragProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onPointerLeave: endDrag,
      onClickCapture,
    },
  };
}
