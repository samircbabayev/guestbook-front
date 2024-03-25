import { HStack, Text, Image } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";

export const FileInput = ({ onChangeFileHandler }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef();

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const handleFiles = (event) => {
    const files = event.target.files;
    onChangeFileHandler(files);

    const imagesArray = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = function (e) {
        imagesArray.push(e.target.result);
        setSelectedImages([...imagesArray]);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {" "}
      <HStack
        onClick={fileInputClicked}
        cursor="pointer"
        padding="15px"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="8px"
        fontSize="14px"
        fontWeight="600"
        justify="space-between"
      >
        <Text>Upload images</Text>
        <AddIcon color="green" />
      </HStack>
      <input
        ref={fileInputRef}
        hidden
        type="file"
        multiple
        onChange={handleFiles}
        accept="image/*"
      />
      <HStack mt="20px" flexWrap="wrap">
        {selectedImages.map((image, index) => (
          <Image
            border="1px solid"
            borderColor="gray.200"
            key={index}
            src={image}
            alt={`preview-${index}`}
            objectFit="cover"
            w="100px"
            height="100px"
            borderRadius="8px"
          />
        ))}
      </HStack>
    </>
  );
};
