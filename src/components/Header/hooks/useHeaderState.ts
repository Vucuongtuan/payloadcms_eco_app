"use client";

import { Header } from "@/payload-types";
import { useWindowScroll } from "@uidotdev/usehooks";
import { useCallback, useRef, useState } from "react";

export function useHeaderState(navData: Header['navItems']) {
  const [isOpen, setIsOpen] = useState(false);
  const [{ y }] = useWindowScroll();
  const [megaDropdownOpen, setMegaDropdownOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
  const isScrolled = (y ?? 0) > 50;

  const handleMenuEnter = useCallback((itemId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const item = navData?.find(item => item.id === itemId);
    if (item?.child?.length) {
      setActiveMenuItem(itemId);
      setMegaDropdownOpen(true);
    }
  }, [navData]);

  const handleMenuLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setMegaDropdownOpen(false);
      setActiveMenuItem(null);
    }, 150);
  }, []);

  const handleDropdownEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const activeItem = activeMenuItem ? navData?.find(item => item.id === activeMenuItem) : null;

  return {
    isOpen,
    isScrolled,
    megaDropdownOpen,
    activeItem,
    toggleMenu,
    handleMenuItemHover: handleMenuEnter,
    handleMenuLeave,
    handleDropdownEnter,
    handleDropdownLeave: handleMenuLeave,
  };
}
