import { Field, GlobalConfig, Tab } from "payload";
import { navItem } from "../fields/navItem";

interface MenuFieldProps {
  label: string;
  name: string;
}

const createMenuTab = ({ label, name }: MenuFieldProps): Tab => ({
  label,
  name,
  fields: [
    {
      name: "logo",
      type: "upload",
      label: "Logo", 
      relationTo: "media"
    },
    {
      name: "navItems",
      type: "array",
      label: "Navigation Items",
      fields: navItem({isNav: true})
    }
  ]
});

export const Menu: GlobalConfig = {
  slug: 'menu',
  fields: [
    {
      type: "tabs",
      tabs: [
        createMenuTab({
          label: "Header Menu",
          name: "header"
        }),
        createMenuTab({
          label: "Footer Menu", 
          name: "footer"
        })
      ]
    }
  ]
};
