import {
    AspectRatio,
    Box,
    CardDescription,
    CardHeader,
    CardRoot,
    CardTitle,
    Container,
    Flex
} from "@chakra-ui/react";
import { ReactNode } from "react";

const logo = '/logo.svg';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {

    return (
        <Box minH="100vh" bg={{ base: "gray.50", _dark: "gray.900" }}>
            <Container maxW="container.xl" h="100vh" p={0}>
                <Flex h="full" direction={{ base: 'column', md: 'row' }}>
                    <Flex flex={1} align="center" justify="center" p={8}>
                        <CardRoot w="full" maxW="md" boxShadow="lg">
                            <CardHeader>
                                <CardTitle fontSize="2xl" fontWeight="bold">
                                    {title}
                                </CardTitle>
                                <CardDescription color={{ base: "gray.600", _dark: "gray.300" }} >
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
                                    <img
                                        src={logo}
                                        alt="Logo"
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