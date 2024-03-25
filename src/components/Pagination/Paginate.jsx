import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { HStack, IconButton } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Dots } from "./Dots";
import { PaginationButton } from "./Button";

export const Paginate = ({
  page,
  totalPageCount,
  onClickPrevPageHandler,
  onClickNextPageHandler,
  onClickPaginateButton,
}) => {
  const pagesArr = [];

  const shownPages = useMemo(() => {
    pagesArr.push({ elementType: "button", pageIndex: 1 });

    if (Number(totalPageCount) <= 7) {
      for (let i = 2; i <= totalPageCount; i++) {
        pagesArr.push({ elementType: "button", pageIndex: i });
      }
      return pagesArr;
    }

    // // when the near to start
    if (page <= 4) {
      for (let i = 2; i <= 5; i++) {
        pagesArr.push({ elementType: "button", pageIndex: i });
      }
      pagesArr.push({ elementType: "dot", pageIndex: null });
      pagesArr.push({ elementType: "button", pageIndex: totalPageCount });
      return pagesArr;
    }

    // // when the near to end
    if (page > totalPageCount - 4) {
      pagesArr.push({ elementType: "dot", pageIndex: null });
      for (let i = totalPageCount - 4; i <= totalPageCount; i++) {
        pagesArr.push({ elementType: "button", pageIndex: i });
      }
      return pagesArr;
    }

    // in the middle
    pagesArr.push({ elementType: "dot", pageIndex: null });
    for (let i = page - 1; i <= page + 1; i++) {
      pagesArr.push({ elementType: "button", pageIndex: i });
    }
    pagesArr.push({ elementType: "dot", pageIndex: null });
    pagesArr.push({ elementType: "button", pageIndex: totalPageCount });

    return pagesArr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, totalPageCount]);

  const renderPaginateType = {
    button: (pageIndex) => (
      <PaginationButton
        pageIndex={pageIndex}
        isCurrentPage={pageIndex === page}
        onClickPaginateButton={onClickPaginateButton}
      />
    ),
    dot: () => <Dots />,
  };

  return (
    <HStack spacing="5px">
      <IconButton
        isDisabled={page === 1}
        isRound
        data-test-id="prev-page"
        variant="gray"
        aria-label="prev"
        icon={<ChevronLeftIcon />}
        onClick={onClickPrevPageHandler}
      />
      {shownPages.map((type, index) => {
        return (
          <React.Fragment key={index}>
            {renderPaginateType[type.elementType](type.pageIndex)}
          </React.Fragment>
        );
      })}
      <IconButton
        isRound
        data-test-id="next-page"
        variant="gray"
        isDisabled={Number(page) >= totalPageCount}
        aria-label="next"
        icon={<ChevronRightIcon />}
        onClick={onClickNextPageHandler}
      />
    </HStack>
  );
};
