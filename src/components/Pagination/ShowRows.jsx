import { HStack, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";

export const ShowRows = ({ total, limit, page }) => {
  const getStartEndCounts = useMemo(() => {
    let start;
    let end;
    if (!!limit) {
      start = (Number(page) - 1) * Number(limit) + 1;
      const maxEndCount = start + Number(limit);
      end = maxEndCount > total ? total : maxEndCount - 1;
    } else {
      start = 1;
      end = total;
    }

    return { start, end };
  }, [page, limit, total]);
  return (
    <>
      <HStack spacing="12px">
        <Text fontSize="14px" color="#616161">
          Record/Page
        </Text>
      </HStack>
      <HStack>
        <Text fontSize="14px">
          <b>
            {getStartEndCounts.start} - {getStartEndCounts.end}
          </b>
        </Text>
        <Text fontSize="14px">
          of <strong>{total}</strong>
        </Text>
      </HStack>
    </>
  );
};
