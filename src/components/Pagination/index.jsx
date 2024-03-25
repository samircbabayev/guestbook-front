import { HStack } from "@chakra-ui/react";
import React from "react";
import { Paginate } from "./Paginate";
import { ShowRows } from "./ShowRows";

export const Pagination = ({
  total,
  totalPageCount,
  limit,
  page,
  onClickNextPageHandler,
  onClickPrevPageHandler,
  onClickPaginateButton,
}) => {
  return (
    <HStack
      w="100%"
      bg="#F5F5F5"
      px="16px"
      py="10px"
      justify="end"
      position="sticky"
      bottom="0px"
    >
      <HStack spacing="32px">
        <ShowRows total={total} limit={limit} page={page} />
        {totalPageCount > 1 && (
          <Paginate
            page={page}
            totalPageCount={totalPageCount}
            onClickNextPageHandler={onClickNextPageHandler}
            onClickPrevPageHandler={onClickPrevPageHandler}
            onClickPaginateButton={onClickPaginateButton}
          />
        )}
      </HStack>
    </HStack>
  );
};
