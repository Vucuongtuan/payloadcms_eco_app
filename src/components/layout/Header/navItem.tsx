import { getLinkNavItem } from "@/app/(payload)/fields/navItem";




const NavItem = (item: any) => {
    const { title, link } = getLinkNavItem(item);
    return <li key={item.id}>
        <a href={link || "#"}>{title}</a>
    </li>
}

export default NavItem;