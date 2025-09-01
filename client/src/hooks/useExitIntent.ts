import { useState, useEffect, useRef, useCallback } from 'react';

interface UseExitIntentOptions {
  enabled?: boolean;
  threshold?: number; // pixels from top to trigger
  delay?: number; // delay before popup can show again (ms)
  sessionDelay?: number; // delay before showing popup after page load (ms)
}

export function useExitIntent({
  enabled = true,
  threshold = 10,
  delay = 60000, // 1 minute
  sessionDelay = 5000 // 5 seconds
}: UseExitIntentOptions = {}) {
  const [isTriggered, setIsTriggered] = useState(false);
  const [canShow, setCanShow] = useState(false);
  const lastTriggeredRef = useRef<number>(0);
  const sessionStartRef = useRef<number>(Date.now());

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger if mouse is leaving from the top and moving upward
    if (
      e.clientY <= threshold &&
      e.relatedTarget === null &&
      canShow &&
      enabled
    ) {
      const now = Date.now();
      const timeSinceLastTrigger = now - lastTriggeredRef.current;
      const timeSinceSessionStart = now - sessionStartRef.current;

      // Check if enough time has passed since last trigger and session start
      if (timeSinceLastTrigger >= delay && timeSinceSessionStart >= sessionDelay) {
        setIsTriggered(true);
        lastTriggeredRef.current = now;
      }
    }
  }, [threshold, canShow, enabled, delay, sessionDelay]);

  const reset = useCallback(() => {
    setIsTriggered(false);
  }, []);

  const disable = useCallback(() => {
    setCanShow(false);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Enable after session delay
    const sessionTimer = setTimeout(() => {
      setCanShow(true);
    }, sessionDelay);

    // Add event listener
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(sessionTimer);
    };
  }, [enabled, handleMouseLeave, sessionDelay]);

  // Reset triggered state when component unmounts or page changes
  useEffect(() => {
    return () => {
      setIsTriggered(false);
    };
  }, []);

  return {
    isTriggered,
    reset,
    disable,
    canShow
  };
}