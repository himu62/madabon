"use client";

import { Grid, GridItem, IconButton } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { SideNavProvider, useSideNav } from "./internal/provider";
import SideNav from "./internal/sidenav";

interface Props {
  children: React.ReactNode;
}

const SideNavContainer = ({ children }: Props) => {
  const { onOpen } = useSideNav();

  return (
    <Grid templateAreas={`"sidebar main"`} templateColumns="auto 1fr">
      <GridItem area="sidebar" as="aside" width="full">
        <SideNav />
        <IconButton aria-label="menu" hideFrom="sm" onClick={onOpen}>
          <FiMenu />
        </IconButton>
      </GridItem>
      <GridItem area="main" as="main">
        {children}
      </GridItem>
    </Grid>
  );
};

const SideNavLayout = ({ children }: Props) => {
  return (
    <SideNavProvider>
      <SideNavContainer>{children}</SideNavContainer>
    </SideNavProvider>
  );
};

export default SideNavLayout;
