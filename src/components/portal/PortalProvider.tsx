"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { PortalTransition } from "./PortalTransition";
import { themeColors } from "./types";
import type { SectionTheme } from "@/lib/site";

interface PortalContextValue {
  enterPortal: (href: string, theme?: SectionTheme) => void;
}

const PortalContext = createContext<PortalContextValue>({
  enterPortal: () => {},
});

export function usePortal() {
  return useContext(PortalContext);
}

/**
 * Dead-simple portal provider:
 * 1. Click → show overlay instantly
 * 2. Call router.push immediately
 * 3. When pathname changes → hide overlay (new page is rendered)
 * 4. Safety timeout: if pathname doesn't change in 3s, hide anyway
 */
export function PortalProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [color, setColor] = useState("#74ccf4");
  const prevPath = useRef(pathname);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enterPortal = useCallback(
    (href: string, theme?: SectionTheme) => {
      if (show) return;
      setColor(theme ? themeColors[theme].glow : "#74ccf4");
      setShow(true);
      router.push(href);

      // Safety: hide after 3s max (in case route doesn't change)
      timeoutRef.current = setTimeout(() => setShow(false), 3000);
    },
    [show, router],
  );

  // Hide overlay when route actually changes
  useEffect(() => {
    if (pathname !== prevPath.current) {
      prevPath.current = pathname;
      if (show) {
        // Small delay so the new page paints first
        setTimeout(() => setShow(false), 150);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
    }
  }, [pathname, show]);

  return (
    <PortalContext.Provider value={{ enterPortal }}>
      {children}
      <PortalTransition active={show} color={color} />
    </PortalContext.Provider>
  );
}
