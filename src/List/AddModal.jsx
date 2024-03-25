import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { FileInput } from "../components/FileInput";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { useSendMessage } from "../hooks";
import { useToast } from '@chakra-ui/react'

export const AddModal = ({ isOpen, onClose, mutate }) => {
  // console.log(mutate);
  const {sendMessage} = useSendMessage();
  const toast = useToast();

  const methods = useForm({
    defaultValues: {
      "full_name": "",
      email: "",
      message: "",
    },
  });
  
  const onSubmitHandler = methods.handleSubmit(async (data) => {

    const resFromAdd = await sendMessage(data);

    if(resFromAdd?.code === 201) {
      mutate();
      onClose();
      methods.reset()
    }

    toast({
      position: 'top',
      title: resFromAdd.code !== 201 ? resFromAdd?.response?.data?.message : resFromAdd?.message,
      status: resFromAdd?.code === 201 ? 'success' : 'warning',
      duration: 9000,
      isClosable: true,
    });
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <FormProvider {...methods}>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Full name</FormLabel>
              <Controller
                name="full_name"
                render={({ field }) => (
                  <Input {...field} placeholder="Full name" />
                )}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>

              <Controller
                name="email"
                render={({ field }) => <Input {...field} placeholder="Email" />}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Message</FormLabel>

              <Controller
                name="message"
                render={({ field }) => (
                  <Textarea {...field} placeholder="Email" />
                )}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Controller
                name="images"
                render={({ field }) => (
                  <FileInput
                    onChangeFileHandler={(files) => field.onChange(files)}
                  />
                )}
              />
            </FormControl>
          </ModalBody>
        </FormProvider>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onSubmitHandler}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
