import { ReactNode } from "react";
import { Navbar } from "../components/Navbar";
import { Box, Container } from "@chakra-ui/react";

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <Box minH="100vh" bg={{ base: "gray.50", _dark: "gray.900" }}>
            <Navbar />

            <Container py={8}  >
                {children}
            </Container>
        </Box>

    )
}