import { Box } from "@chakra-ui/react";
import { Alert } from "./chakra/alert"

interface ErrorAlertProps {
    title?: string;
    message?: string;
}

export const ErrorAlert = ({ title, message }: ErrorAlertProps) => {
    return (
        <Box pt={4} pb={4}>
            <Alert
                status="error"
                title={title || 'Error. Por favor, inténtalo de nuevo.'}
            >
                {message || 'Ha ocurrido un error. Por favor, inténtalo de nuevo.'}
            </Alert>
        </Box>
    )
}