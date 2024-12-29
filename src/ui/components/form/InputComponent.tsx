import { Input, Text } from "@chakra-ui/react";
import { Field } from "../chakra/field";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputComponentProps {
    name: string;
    label?: string;
    helperText?: string;
    register: UseFormRegister<any>
    className?: string;
    formErrors: FieldErrors
    rules?: Pick<
        RegisterOptions,
        "maxLength" | "minLength" | "validate" | "required" | "pattern"
    >
    placeholder?: string
    type?: string
    disabled?: boolean
}


export const InputComponent = ({ disabled = false, name, register, rules, formErrors, type = 'text', placeholder, label, helperText }: TextInputComponentProps) => {
    const required = Object.keys(rules || {}).includes('required');

    return (

        <Field
            label={(
                <>
                    {label}
                    {required && <Text color='red'>*</Text>}
                </>
            )}
            helperText={helperText}
            invalid={!!formErrors[name]}
            errorText={formErrors[name]?.message?.toString()}
        >
            <Input
                type={type}
                disabled={disabled}
                {...register(name, rules)}
                placeholder={placeholder}
            />
        </Field>
    )
}