"use client";
import { useNav } from "@payloadcms/ui";
import clsx from "clsx";
import React from "react";

export const NavWrap: React.FC<{
  baseClass?: string;
  children: React.ReactNode;
}> = (props) => {
  const { baseClass, children } = props;

  const { hydrated, navOpen, navRef, shouldAnimate } = useNav();

  return (
    <aside
      className={clsx(
        baseClass,
        navOpen && `${baseClass}--nav-open`,
        shouldAnimate && `${baseClass}--nav-animate`,
        hydrated && `${baseClass}--nav-hydrated`,
      )}
      inert={!navOpen ? true : undefined}
    >
      <div className={`${baseClass}__scroll`} ref={navRef}>
        {children}
      </div>
    </aside>
  );
};
