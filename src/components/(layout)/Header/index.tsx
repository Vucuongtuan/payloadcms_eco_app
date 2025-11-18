import type { Header as HeaderType } from "@/payload-types";
import { findGlobal } from "@/service/layout";
import { Lang } from "@/types";
import { ActionButtons } from "./ActionButtons";
import { HeaderStatic } from "./HeaderStatic";

export async function Header({ lang }: { lang: Lang }) {
  const header = await findGlobal<HeaderType>(lang, "header");
  if (!header) return null;
  return (
    <header className="sticky top-0 left-0 w-full z-50">
      <HeaderStatic navData={header.navItems}>
        <ActionButtons />
      </HeaderStatic>
    </header>
  );
}
