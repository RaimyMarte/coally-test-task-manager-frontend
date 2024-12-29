import { Spinner, Flex, Text } from "@chakra-ui/react";

interface LoadingProps {
  message?: string;
}

export const Loading = ({ message = 'Cargando...' }: LoadingProps) => {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      height="100vh"
    >
      <Spinner
        color="blue.600"
        size="xl"
      />
      <Text mt={4} fontSize="lg" >
        {message}
      </Text>
    </Flex>
  );
};
