import { Media, Setting } from "@/payload-types";
import { findSettings } from "@/service/layout";
import { Lang, NavChildItem } from "@/types";
import HeaderClient from "./HeaderClient";
export default async function Header(props: { lang: Lang }) {
  const { lang } = props;
  const query = await findSettings<Setting["nav"]>(lang, "nav");
  const logo = query?.header?.logo as Media;
  const navMenu = query?.header?.navItems as NavChildItem[]
  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
       <HeaderClient logo={logo} menu={navMenu}/>
    </header>
);
}
