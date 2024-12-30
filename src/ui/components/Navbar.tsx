import { useAuthStore } from "@/hooks";
import { useLogoutMutation } from "@/store/api/auth/authApi";
import { Avatar } from "@/ui/components/chakra/avatar";
import { Button } from "@/ui/components/chakra/button";
import { toaster } from "@/ui/components/chakra/toaster";
import { isMutationSuccessResponse } from "@/utils";
import { Flex, Box, Text, Image, } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const logo = '/logo.png';

export const Navbar = () => {
    const navigate = useNavigate()

    const { handleLogoutState, user } = useAuthStore()
    const [logout, { isLoading: logoutLoading, }] = useLogoutMutation()

    const handleLogout = async () => {
        try {
            const response = await logout()

            if (isMutationSuccessResponse(response)) {
                const { data: respData } = response

                if (!respData?.isSuccess) {
                    toaster.create({
                        title: respData?.title,
                        description: respData?.message,
                        type: "error",
                    });
                    return;
                }

                handleLogoutState()

                toaster.create({
                    title: respData?.title,
                    description: respData?.message,
                    type: "success",
                });

                navigate('/auth/login')
            }
        } catch (error) {
            toaster.create({
                title: "Error",
                description: `Ha ocurrido un error: ${error}`,
                type: "error",
            });
        }
    }

    return (
        <Flex
            as="nav"
            justify="space-between"
            align="center"
            padding="1rem"
            bg="gray.950"
            color="white"
            boxShadow="md"
            position="sticky"
            top="0"
            zIndex="1000"
        >
            <Box ml={{ base: 0, sm: 2 }}>
                <Image
                    src={logo}
                    alt="Logo"
                    height='40px'
                    width='auto'
                    cursor='pointer'
                    onClick={() => navigate('/')}
                />
            </Box>

            <Flex align="center" mr={{ base: 0, sm: 2 }}>
                <Text mr="4" fontWeight="bold">{user?.name}</Text>
                <Avatar name={user?.name} size="sm" mr="4" />

                <Button
                    onClick={handleLogout}
                    loading={logoutLoading}
                    loadingText="Cerrando Sesión..."
                >
                    Cerrar Sesión
                </Button>
            </Flex>
        </Flex>
    );
};
