import { HiOutlineTemplate } from "react-icons/hi";
import { SiSessionize } from "react-icons/si";
import { SideNavItem } from "./items";

const contents: SideNavItem[] = [
  { icon: <HiOutlineTemplate />, label: "テンプレート", href: "/templates" },
  { icon: <SiSessionize />, label: "セッション", href: "/sessions" },
];

export default contents;
