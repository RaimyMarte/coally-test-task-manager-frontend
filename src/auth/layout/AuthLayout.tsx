import {
    AspectRatio,
    Box,
    CardDescription,
    CardHeader,
    CardRoot,
    CardTitle,
    Container,
    Flex,
    Image
} from "@chakra-ui/react";
import { ReactNode } from "react";

const image = '/image.svg';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {

    return (
        <Box minH="100vh" bg={{ base: "gray.50", _dark: "gray.900" }} >
            <Container fluid h="100vh" p={0}>
                <Flex h="full" direction={{ base: 'column', md: 'row' }}>
                    <Flex flex={1} align="center" justify="center" p={8}>
                        <CardRoot w="full" maxW="md" boxShadow="lg">
                            <CardHeader>
                                <CardTitle fontSize="2xl" fontWeight="bold">
                                    {title}
                                </CardTitle>
                                <CardDescription  >
                                    {subtitle}
                                </CardDescription>
                            </CardHeader>

                            {children}
                        </CardRoot>
                    </Flex>

                    <Flex
                        flex={1}
                        display={{ base: 'none', md: 'flex' }}
                        bg="blue.500"
                        position="relative"
                    >
                        <AspectRatio ratio={16 / 9} w="full">
                            <Box
                                bg="blue.500"
                                position="relative"
                                overflow="hidden"
                            >

                                <Box
                                    w="full"
                                    h="full"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Image 
                                        src={image}
                                        alt="image"
                                        style={{
                                            maxWidth: '70%',
                                            maxHeight: '70%'
                                        }}
                                    />
                                </Box>
                            </Box>
                        </AspectRatio>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
};