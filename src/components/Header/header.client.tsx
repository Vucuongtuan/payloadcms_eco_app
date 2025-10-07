"use client";

import { Header } from "@/payload-types";
import { AuthButtons } from "./AuthButtons";
import { MegaDropdown } from "./MegaDropdown";
import { MobileMenuButton } from "./MobileMenuButton";
import { MobileMenuOverlay } from "./MobileMenuOverlay";
import { Navigation } from "./Navigation";
import { useHeaderState } from "./hooks/useHeaderState";

interface HeaderClientProps {
  navData: Header['navItems'];
}

export default function HeaderClient({ navData }: HeaderClientProps) {
  const {
    isOpen,
    isScrolled,
    megaDropdownOpen,
    activeItem,
    toggleMenu,
    handleMenuItemHover,
    handleMenuLeave,
    handleDropdownEnter,
    handleDropdownLeave,
  } = useHeaderState(navData);

  return (
    <div className="relative">
      <div
        className={`flex gap-12 items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled ? "h-10" : "h-17"
        }`}
      >
        {/* <Logo /> */}
        <div className="flex-1" onMouseLeave={handleMenuLeave}>
          <Navigation 
            navData={navData} 
            onMenuItemHover={handleMenuItemHover}
          />
          <MegaDropdown
            isOpen={megaDropdownOpen}
            activeItem={activeItem}
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          />
        </div>
        <AuthButtons />
        <MobileMenuButton isOpen={isOpen} onClick={toggleMenu} />
      </div>

      <MobileMenuOverlay
        isOpen={isOpen}
        navData={navData}
        onToggle={toggleMenu}
      />
    </div>
  );
}

