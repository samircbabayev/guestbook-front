import { Box } from "@chakra-ui/react";
import { Header } from "./Header";

export const Layout = ({ children, mutate }) => {
  
  return (
    <Box bg="white" borderRadius="8px" m="20px" w="100%" overflow="hidden">
      <Header mutate={mutate} />
      {children}
    </Box>
  );
};
