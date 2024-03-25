import React from "react";
import { Button as ChakraButton } from "@chakra-ui/react";

export const PaginationButton = ({
  pageIndex,
  isCurrentPage,
  onClickPaginateButton,
}) => {
  return (
    <ChakraButton
      borderRadius="100%"
      w="35px"
      h="35px"
      fontSize="12px"
      variant="gray"
      isActive={isCurrentPage}
      _active={{
        bg: isCurrentPage ? "white" : "transparent",
      }}
      onClick={() => onClickPaginateButton(pageIndex)}
    >
      {pageIndex}
    </ChakraButton>
  );
};
