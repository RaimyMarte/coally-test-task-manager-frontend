import { SignUpBody, useSignUpMutation } from '@/store/api/auth/authApi';
import { Alert } from '@/ui/components/chakra/alert';
import { Button } from "@/ui/components/chakra/button";
import { toaster } from '@/ui/components/chakra/toaster';
import { InputComponent } from '@/ui/components/form';
import { isMutationSuccessResponse } from '@/utils';
import {
    CardBody,
    CardFooter,
    Link as ChakraLink,
    Stack,
    Text
} from "@chakra-ui/react";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../layout/AuthLayout';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export const SignUpPage = () => {
    const [signUp, { isLoading: signUpLoading }] = useSignUpMutation();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors: formErrors },
        reset,
        watch,
    } = useForm<SignUpBody>();

    const password = watch('password');

    const onFormSubmit = async (data: SignUpBody) => {
        try {
            const response = await signUp(data);

            if (isMutationSuccessResponse(response)) {
                const { data: respData } = response;

                if (!respData?.isSuccess) {
                    setError(respData?.message || "");
                    return;
                }

                toaster.create({
                    title: respData?.title,
                    description: respData?.message,
                    type: "success",
                });

                setError('');
                reset();
                navigate('/auth/login');
            }
        } catch (error) {
            setError(`Ha ocurrido un error: ${error}`);
        }
    };

    return (
        <AuthLayout title='TaskTide' subtitle="Crea una cuenta para empezar a usar TaskTide">
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <CardBody>
                    <Stack spaceY={1}>
                        <InputComponent
                            name='name'
                            label="Nombre"
                            type="text"
                            placeholder="Tu nombre"
                            disabled={signUpLoading}
                            register={register}
                            formErrors={formErrors}
                            rules={{
                                required: 'El nombre es obligatorio',
                            }}
                        />

                        <InputComponent
                            name='email'
                            label="Correo electrónico"
                            type="text"
                            placeholder="correo@ejemplo.com"
                            disabled={signUpLoading}
                            register={register}
                            formErrors={formErrors}
                            rules={{
                                required: 'El correo electrónico es obligatorio',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'El correo electrónico no es válido',
                                },
                            }}
                        />

                        <InputComponent
                            name='password'
                            label="Contraseña"
                            type="password"
                            placeholder="Tu contraseña"
                            disabled={signUpLoading}
                            register={register}
                            formErrors={formErrors}
                            rules={{
                                required: 'La contraseña es obligatoria',
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                    message: 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número',
                                },
                            }}
                        />

                        <InputComponent
                            name='confirmPassword'
                            label="Confirmar Contraseña"
                            type="password"
                            placeholder="Confirma tu contraseña"
                            disabled={signUpLoading}
                            register={register}
                            formErrors={formErrors}
                            rules={{
                                required: 'La confirmación de la contraseña es obligatoria',
                                validate: value =>
                                    value === password || 'Las contraseñas no coinciden',
                            }}
                        />

                        {error && (
                            <Alert
                                status="error"
                                title={error}
                            />
                        )}
                    </Stack>
                </CardBody>

                <CardFooter>
                    <Stack w="full">
                        <Button
                            type="submit"
                            size="lg"
                            loading={signUpLoading}
                            loadingText="Registrándote..."
                            bg="blue.600"
                            color='white'
                            w="full"
                        >
                            Registrarme
                        </Button>

                        <Text fontSize="sm" textAlign="center">
                            ¿Ya tienes una cuenta?{' '}
                            <ChakraLink
                                as={RouterLink}
                                color="blue.600"
                                _hover={{ textDecoration: 'underline' }}
                                {...({ to: "/auth/login" })}
                            >
                                Iniciar Sesión
                            </ChakraLink>
                        </Text>
                    </Stack>
                </CardFooter>
            </form>
        </AuthLayout>
    );
};
