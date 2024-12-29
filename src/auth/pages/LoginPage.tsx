import { useAuthStore } from '@/hooks';
import { LoginBody, useLoginMutation } from '@/store/api/auth/authApi';
import { Alert } from '@/ui/components/chakra/alert';
import { Button } from "@/ui/components/chakra/button";
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
import { toaster } from '@/ui/components/chakra/toaster';
import { Link as RouterLink } from 'react-router-dom';

export const LoginPage = () => {
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const { handleLoginState, handleLogoutState } = useAuthStore();
  const [error, setError] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    reset,
  } = useForm<LoginBody>();

  const onFormSubmit = async (data: LoginBody) => {
    try {
      const response = await login(data);

      if (isMutationSuccessResponse(response)) {
        const { data: respData } = response;

        if (!respData?.isSuccess) {
          setError(respData?.message || "");
          handleLogoutState();
          return;
        }

        handleLoginState(respData?.data?.user);

        toaster.create({
          title: respData?.title,
          description: respData?.message,
          type: "success",
        })

        setError('');
        reset();
      }
    } catch (error) {
      setError(`Ha ocurrido un error: ${error}`);
    }
  };

  return (
    <AuthLayout title='TaskTide' subtitle='Por favor, inicie sesión en su cuenta'>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <CardBody>
          <Stack spaceY={1}>
            <InputComponent
              name='email'
              label="Correo electrónico"
              type="text"
              placeholder="correo@ejemplo.com"
              disabled={loginLoading}
              register={register}
              formErrors={formErrors}
              rules={{
                required: 'Correo electrónico es requerido',
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
              disabled={loginLoading}
              register={register}
              formErrors={formErrors}
              rules={{
                required: 'Contraseña es requerida',
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
              loading={loginLoading}
              loadingText="Iniciando Sesión..."
              bg="blue.600"
              color='white'
              w="full"
            >
              Iniciar Sesión
            </Button>

            <Text fontSize="sm" textAlign="center">
              ¿No tienes una cuenta?{' '}
              <ChakraLink
                as={RouterLink}
                color="blue.600"
                _hover={{ textDecoration: 'underline' }}
                {...({ to: "/auth/sign-up" })}
              >
                Regístrate
              </ChakraLink>
            </Text>
          </Stack>
        </CardFooter>
      </form>
    </AuthLayout>
  );
};