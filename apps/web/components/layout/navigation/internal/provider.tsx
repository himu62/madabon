import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext } from "react";

const SideNavContext = createContext<ReturnType<typeof useDisclosure> | null>(
  null,
);

export const useSideNav = () => {
  const sidenav = useContext(SideNavContext);
  if (!sidenav) {
    throw new Error("useSideNav must be used within a SideNavProvider");
  }
  return sidenav;
};

export const SideNavProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const disclosure = useDisclosure();
  return (
    <SideNavContext.Provider value={disclosure}>
      {children}
    </SideNavContext.Provider>
  );
};
