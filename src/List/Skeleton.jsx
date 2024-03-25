import {
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Skeleton,
} from "@chakra-ui/react";

export const PageSkeleton = () => {
  return (
    <>
      <TableContainer>
        <ChakraTable>
          <Thead>
            <Tr>
              <Th>Full Name</Th>
              <Th>Email</Th>
              <Th>Message</Th>
              <Th>Image</Th>
              <Th>Created</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array(10)
              .fill(null)
              .map((_, index) => (
                <Tr key={index}>
                  <Td>
                    <Skeleton w="100px" h="15px" />
                  </Td>
                  <Td>
                    <Skeleton w="100px" h="15px" />
                  </Td>
                  <Td>
                    <Skeleton w="100px" h="15px" />
                  </Td>
                  <Td>
                    <Skeleton w="100px" h="15px" />
                  </Td>
                  <Td>
                    <Skeleton w="100px" h="15px" />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </ChakraTable>
      </TableContainer>
    </>
  );
};
