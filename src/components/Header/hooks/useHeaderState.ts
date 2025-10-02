"use client";

import { Header } from "@/payload-types";
import { useWindowScroll } from "@uidotdev/usehooks";
import { useCallback, useState } from "react";

export function useHeaderState(navData: Header['navItems']) {
  const [isOpen, setIsOpen] = useState(false);
  const [{ y }] = useWindowScroll();
  const [megaDropdownOpen, setMegaDropdownOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
  const isScrolled = (y ?? 0) > 50;

  const handleMenuItemHover = useCallback((itemId: string) => {
    const item = navData?.find(item => item.id === itemId);
    if (item?.child?.length) {
      setActiveMenuItem(itemId);
      setMegaDropdownOpen(true);
    }
  }, [navData]);

  const handleMenuLeave = useCallback(() => {
    // Delay để tránh flicker khi di chuyển chuột
    setTimeout(() => {
      setActiveMenuItem(null);
      setMegaDropdownOpen(false);
    }, 150);
  }, []);

  const handleDropdownEnter = useCallback(() => {
    setMegaDropdownOpen(true);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    setActiveMenuItem(null);
    setMegaDropdownOpen(false);
  }, []);

  const activeItem = activeMenuItem ? navData?.find(item => item.id === activeMenuItem) : null;

  return {
    isOpen,
    isScrolled,
    megaDropdownOpen,
    activeMenuItem,
    activeItem,
    toggleMenu,
    handleMenuItemHover,
    handleMenuLeave,
    handleDropdownEnter,
    handleDropdownLeave,
  };
}
