import { Tooltip } from "@/components/ui/tooltip";
import { Flex, Icon, IconButton, List, Text } from "@chakra-ui/react";
import Link from "next/link";
import { JSX } from "react";
import { useSideNav } from "./provider";

export interface SideNavItem {
  icon: JSX.Element;
  label: string;
  href: string;
}

interface Props {
  items: SideNavItem[];
}

const SideNavItems = ({ items }: Props) => {
  const { open } = useSideNav();

  const minimize = (item: SideNavItem, index: number) => (
    <List.Item key={index}>
      <Tooltip content={item.label} positioning={{ placement: "right" }}>
        <Link href={item.href}>
          <IconButton>{item.icon}</IconButton>
        </Link>
      </Tooltip>
    </List.Item>
  );

  const maximize = (item: SideNavItem, index: number) => (
    <List.Item key={index}>
      <Link href={item.href}>
        <Flex alignItems="center">
          <Icon>{item.icon}</Icon>
          <Text padding="2">{item.label}</Text>
        </Flex>
      </Link>
    </List.Item>
  );

  return (
    <nav>
      <List.Root spaceY={3}>
        {items.map((item, index) =>
          open ? maximize(item, index) : minimize(item, index)
        )}
      </List.Root>
    </nav>
  );
};

export default SideNavItems;
