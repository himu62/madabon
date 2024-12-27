import {
  Box,
  Flex,
  Icon,
  IconButton,
  Image,
  useBreakpoint,
  VStack,
} from "@chakra-ui/react";
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
import { Tooltip } from "@/components/ui/tooltip";
import IconLogo from "@/components/icon/logo";

const SideNav = () => {
  const { open, onOpen, onClose } = useSideNav();
  const isSmall = useBreakpoint({ breakpoints: ["sm"] }) !== "sm";
  const bgColor = useColorModeValue("gray.200", "gray.800");

  return (
    <React.Fragment>
      <VStack hideBelow="sm" p="2" height="100vh" bg={bgColor}>
        <Icon fontSize="1em">
          <IconLogo />
        </Icon>
        <Flex justify="flex-end" width="full">
          {open ? (
            <Tooltip
              content="メニューをしまう"
              positioning={{ placement: "right" }}
            >
              <IconButton onClick={onClose}>
                <FaArrowLeft />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip
              content="メニューを広げる"
              positioning={{ placement: "right" }}
            >
              <IconButton onClick={onOpen}>
                <FaArrowRight />
              </IconButton>
            </Tooltip>
          )}
        </Flex>
        <Box flex="1">
          <SideNavItems items={contents} />
        </Box>
        <Flex justify="flex-end" width="full">
          <ColorModeButton />
        </Flex>
        <DrawerRoot open={open && isSmall} placement="start">
          <DrawerBackdrop />
          <DrawerTrigger />
          <DrawerContent bg={bgColor}>
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
      </VStack>
    </React.Fragment>
  );
};
export default SideNav;
