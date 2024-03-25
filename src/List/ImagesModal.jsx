import {
  Modal,
  ModalBody,
  Button,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  HStack,
  Image,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import { useGetImages } from "../hooks";

export const ImagesModal = ({ isOpen, onClose, selectedId }) => {
  const { images, message } = useGetImages(selectedId);

  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Images</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack flexWrap="wrap">
            {!images
              ? (<Text>{message}</Text> || Array(6)
                  .fill(null)
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      h="140px"
                      w="170px"
                      borderRadius="5px"
                    />
                  )))
              : images?.map((image, index) => (
                  <Image
                    h="140px"
                    w="170px"
                    objectFit="cover"
                    key={index}
                    alt="images"
                    src={image}
                    borderRadius="5px"
                  />
                ))}

            {}
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
