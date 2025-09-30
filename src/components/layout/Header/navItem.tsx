import { getLinkNavItem } from "@/app/(payload)/fields/navItem";
import { NavItem as NavItemType } from "@/types";
import { motion } from "framer-motion";
interface NavItemProps {
  item: NavItemType;
  onMouseEnter: (title: string) => void;
  onMouseLeave: () => void;
  className?: string;
}

const NavItem = ({
  item,
  onMouseEnter,
  onMouseLeave,
  className = "",
}: NavItemProps) => {
  const { title, link } = getLinkNavItem(item);

  const handleMouseEnter = () => {
    if (item.title) {
      onMouseEnter(item.title);
    }
  };

  return (
    <li
      className={`${className} list-none border-[1px] border-transparent hover:border-b-black`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <a href={link || "#"}>{title}</a>
    </li>
  );
};

export default NavItem;
