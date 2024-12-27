import { Box, Flex, IconButton, useBreakpoint, VStack } from "@chakra-ui/react";
import React from "react";
import contents from "./contents";
import SideNavItems from "./items";
import { useSideNav } from "./provider";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CloseButton } from "@/components/ui/close-button";
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode";

const SideNav = () => {
  const { open, onOpen, onClose } = useSideNav();
  const isSmall = useBreakpoint({ breakpoints: ["sm"] }) === "base";
  console.log(isSmall);

  return (
    <React.Fragment>
      <VStack
        hideBelow="md"
        p="2"
        height="100vh"
        bg={useColorModeValue("gray.200", "gray.800")}
      >
        <Flex justify="flex-end" width="full">
          {open ? (
            <IconButton onClick={onClose}>
              <FaArrowLeft />
            </IconButton>
          ) : (
            <IconButton onClick={onOpen}>
              <FaArrowRight />
            </IconButton>
          )}
        </Flex>
        <Box flex="1">
          <SideNavItems items={contents} />
        </Box>
        <Flex justify="flex-end" width="full">
          <ColorModeButton />
        </Flex>
      </VStack>
      <DrawerRoot open={open && isSmall} placement="start">
        <DrawerBackdrop />
        <DrawerTrigger />
        <DrawerContent>
          <DrawerHeader>
            <CloseButton onClick={onClose} />
          </DrawerHeader>
          <DrawerBody>
            <SideNavItems items={contents} />
          </DrawerBody>
          <DrawerFooter>
            <ColorModeButton />
          </DrawerFooter>
        </DrawerContent>
      </DrawerRoot>
    </React.Fragment>
  );
};
export default SideNav;
