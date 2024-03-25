import { HStack, Text, Button, useDisclosure } from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import { AddModal } from "./AddModal";

export const Header = ({mutate}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack p="20px" justify="space-between">
      <Text fontWeight="600" fontSize="18px">
        Messages
      </Text>
      <Button onClick={onOpen} leftIcon={<AddIcon />} colorScheme="blue">
        Add
      </Button>
      <AddModal {...{ isOpen, onClose, mutate }} />
    </HStack>
  );
};
