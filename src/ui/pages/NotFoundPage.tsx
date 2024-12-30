import { AuthLayout } from "@/auth/layout/AuthLayout";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <AuthLayout title="404 - Página No Encontrada" subtitle="Lo sentimos, la página que estás buscando no está disponible. Verifica la URL o regresa a la página de inicio.">
      <Box textAlign="center" py={10} px={6}>
        <Button colorScheme="teal" onClick={handleGoHome}>
          Regresar a la Página Principal
        </Button>
      </Box>
    </AuthLayout>
  );
};
