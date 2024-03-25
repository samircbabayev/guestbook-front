import {
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  PopoverHeader,
  PopoverFooter,
  ButtonGroup,
  PopoverBody,
  Tr,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ViewIcon, DeleteIcon } from "@chakra-ui/icons";
import { Pagination } from "../components/Pagination";
import { ImagesModal } from "./ImagesModal";
import { useCallback, useState, useRef } from "react";
import { useDeleteMessage } from "../hooks";
import { useToast } from '@chakra-ui/react'

export const Table = ({ data, onChangePageHandler, mutate }) => {
  const [selectedId, setSelectedId] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDelOver, onToggle, onClose: onCloseDelOver } = useDisclosure();

  const {deleteMessage} = useDeleteMessage();

  const toast = useToast();

  const onClickDeleteMessageHandler = async (id) => {
    setSelectedId(id);
    const resFromDel = await deleteMessage(id);
    mutate();
    onCloseDelOver();

    toast({
      position: 'top',
      title: resFromDel.code !== 200 ? resFromDel?.response?.data?.message : resFromDel?.message,
      status: resFromDel?.code === 200 ? 'success' : 'warning',
      duration: 9000,
      isClosable: true,
    });

  };

  const onClickOpenImagesHandler = useCallback((id) => {
    onOpen();
    setSelectedId(id);
  }, []);

  const onCloseHandler = useCallback(() => {
    onClose();
    setSelectedId(null);
  }, []);


  return (
    <>
      <TableContainer>
        <ChakraTable>
          <Thead>
            <Tr>
              <Th>Full Name</Th>
              <Th>Email</Th>
              <Th>Message</Th>
              <Th>Created</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data.map((book) => {
              return (
                <Tr key={book?.id}>
                  <Td>{book?.full_name}</Td>
                  <Td>{book?.email}</Td>
                  <Td>
                    <Tooltip
                      placement="bottom-start"
                      hasArrow
                      label={book?.message}
                    >
                      <Text
                        maxW="200px"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                      >
                        {book?.message}
                      </Text>
                    </Tooltip>
                  </Td>
                  <Td fontSize="14px">
                    {new Intl.DateTimeFormat("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(new Date(book?.updated_at))}
                  </Td>
                  <Td>
                    <Tooltip borderRadius="5px" hasArrow label="View Images">
                      <IconButton
                        marginRight="8px"
                        onClick={() => onClickOpenImagesHandler(book.id)}
                        aria-label="images"
                        icon={<ViewIcon />}
                      />
                    </Tooltip>

                    <Popover
                    >
                    {({isOpen: isOpenDelOver, onClose: onCloseDelOver}) => (
                      <>
                      <PopoverTrigger>
                        <Button backgroundColor="red" ><DeleteIcon textColor="white" /></Button>
                      </PopoverTrigger>
                      <Portal>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader>Are you sure delete this message?</PopoverHeader>
                        <PopoverFooter display='flex' justifyContent='flex-end'>
                          <ButtonGroup size='sm'>
                            <Button onClick={onCloseDelOver } variant='outline'>Cancel</Button>
                            <Button onClick={() => onClickDeleteMessageHandler(book.id)} colorScheme='red'>Yes</Button>
                          </ButtonGroup>
                        </PopoverFooter>
                      </PopoverContent>
                      </Portal>
                      </>
                    )}
                    </Popover>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </ChakraTable>
      </TableContainer>
      <Pagination
        total={data?.total}
        totalPageCount={data?.last_page}
        limit={100}
        page={data?.current_page}
        onClickNextPageHandler={() => onChangePageHandler("next")}
        onClickPrevPageHandler={() => onChangePageHandler("prev")}
        onClickPaginateButton={(pageNumber) =>
          onChangePageHandler("custom", pageNumber)
        }
      />
      {selectedId && (
        <ImagesModal {...{ isOpen, onClose: onCloseHandler, selectedId }} />
      )}

    </>
  );
};
