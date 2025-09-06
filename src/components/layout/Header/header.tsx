"use client";

import { Menu } from "@/payload-types";
import NavItem from "./navItem";


interface HeaderProps {
    lang: "vi" | "en" | string;
    menu?: Menu['header'] | undefined;
}
export default function Header(props: HeaderProps) {
    const { lang, menu } = props;
    // console.log("Header menu: " + lang + " " + menu);
    console.log({ menu })

    if (!menu) return null;
    return <header className="">
        <div className="container mx-auto h-16 w-full px-4 flex justify-center items-center">
            <div className="logo w-1/5 text-2xl">Logo</div>
            <nav className="flex-1">
                <ul className="flex justify-center gap-4">
                    {menu && menu.navItems && menu.navItems.map((item) => (
                        <NavItem key={item.id} item={item} />
                    ))}
                </ul>
            </nav>
            <div className="action w-1/5"></div>
        </div>
    </header>;
}

