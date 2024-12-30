import { Text, Textarea } from "@chakra-ui/react";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";
import { Field } from "../chakra/field";

interface TextTextAreaComponentProps {
    name: string;
    label?: string;
    helperText?: string;
    register: UseFormRegister<any>
    formErrors: FieldErrors
    rules?: Pick<
        RegisterOptions,
        "maxLength" | "minLength" | "validate" | "required" | "pattern"
    >
    placeholder?: string
    disabled?: boolean
    size?: "lg" | "sm" | "md" | "xl" | "xs" | undefined
}


export const TextAreaComponent = ({ size = 'xl', disabled = false, name, register, rules, formErrors, placeholder, label, helperText }: TextTextAreaComponentProps) => {
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
            <Textarea
                autoresize
                size={size}
                disabled={disabled}
                {...register(name, rules)}
                placeholder={placeholder}
            />
        </Field>
    )
}