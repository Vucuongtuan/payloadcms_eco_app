"use client";

import { getTranslation } from "@payloadcms/translations";
import { NavGroup, useConfig, useTranslation } from "@payloadcms/ui";
import { baseClass } from "./index";
import {
  EntityType,
  formatAdminURL,
  NavGroupType,
} from "@payloadcms/ui/shared";
import { usePathname } from "next/navigation";
import LinkWithDefault from "next/link";
import { NavPreferences } from "payload";
import { FC, Fragment } from "react";
import { getNavIcon } from "./navIconMap";
import { motion } from "framer-motion";
import { Icon } from "lucide-react";
type Props = {
  groups: NavGroupType[];
  navPreferences: NavPreferences | null;
};

export const NavClient: FC<Props> = ({ groups, navPreferences }) => {
  const pathname = usePathname();

  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig();

  const { i18n } = useTranslation();

  return (
    <Fragment>
      {groups.map(({ entities, label }, key) => {
        return (
          <NavGroup
            isOpen={navPreferences?.groups?.[label]?.open}
            key={key}
            label={label}
          >
            {entities.map(({ slug, type, label }, i) => {
              let href: string;
              let id: string;

              if (type === EntityType.collection) {
                href = formatAdminURL({
                  adminRoute,
                  path: `/collections/${slug}`,
                });
                id = `nav-${slug}`;
              } else {
                href = formatAdminURL({ adminRoute, path: `/globals/${slug}` });
                id = `nav-global-${slug}`;
              }
              const activeCollection =
                pathname.startsWith(href) &&
                ["/", undefined].includes(pathname[href.length]);

              const MotionLink = motion(LinkWithDefault);
              const Icon = getNavIcon(slug);
              return (
                <MotionLink
                  className={`${baseClass}__link`}
                  href={href}
                  id={id}
                  key={i}
                  prefetch={false}
                  style={{ position: "relative" }}
                  animate={{
                    backgroundColor: activeCollection
                      ? "var(--theme-elevation-100)"
                      : "transparent",
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                >
                  {activeCollection && (
                    <motion.div
                      className={`${baseClass}__link-indicator`}
                      layoutId="active-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  {Icon && <Icon className={`${baseClass}__icon`} />}
                  <motion.span className={`${baseClass}__link-label`}>
                    {getTranslation(label, i18n)}
                  </motion.span>
                </MotionLink>
              );
            })}
          </NavGroup>
        );
      })}
    </Fragment>
  );
};
