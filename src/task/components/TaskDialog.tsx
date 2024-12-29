import { TaskInterface } from "@/interfaces";
import { TaskBody, useCreateTaskMutation, useUpdateTaskMutation } from '@/store/api/task/taskApi';
import { Alert } from "@/ui/components/chakra/alert";
import { Button } from "@/ui/components/chakra/button";
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger, } from "@/ui/components/chakra/dialog";
import { toaster } from "@/ui/components/chakra/toaster";
import { InputComponent, TextAreaComponent } from "@/ui/components/form";
import { isMutationSuccessResponse } from "@/utils";
import { Plus } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface TaskDialogProps {
    editingTask: TaskInterface | null;
    isDialogOpen: boolean;
    setEditingTask: Dispatch<SetStateAction<TaskInterface | null>>
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}


export const TaskDialog = ({ editingTask, isDialogOpen, setEditingTask, setIsDialogOpen }: TaskDialogProps) => {
    const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
    const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

    const onToggleDialog = () => setIsDialogOpen((prev) => !prev);
    const [error, setError] = useState('');

    const {
        handleSubmit,
        register,
        formState: { errors: formErrors },
        reset,
    } = useForm<TaskBody>();


    const onCloseDialog = () => {
        setError('');
        reset();
        setEditingTask(null);
        setIsDialogOpen(false);
    }

    const onFormSubmit = async (data: TaskBody) => {
        try {
            const response = editingTask
                ? await updateTask({
                    taskId: editingTask?._id,
                    body: data,
                })
                : await createTask(data);

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

                onCloseDialog()
            }
        } catch (error) {
            setError(`Ha ocurrido un error: ${error}`);
        }
    };

    useEffect(() => {
        const defaultValues: TaskBody = {
            title: editingTask?.title || '',
            description: editingTask?.description || '',
        };

        reset(defaultValues as TaskBody);
    }, [editingTask, reset]);


    return (
        <DialogRoot
            open={isDialogOpen}
            onOpenChange={onToggleDialog}
            onExitComplete={onCloseDialog}
        >
            <DialogTrigger asChild>
                <Button
                    bg="blue.600"
                    color="white"
                    disabled={isCreating}
                >
                    <Plus /> Agregar Tarea
                </Button>
            </DialogTrigger>
            <DialogContent maxW="lg" mx="auto">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <DialogCloseTrigger />
                    <DialogHeader>
                        <DialogTitle>
                            {editingTask ? 'Editar Tarea' : 'Nueva Tarea'}
                        </DialogTitle>
                        <DialogDescription>
                            Complete los detalles de la tarea
                        </DialogDescription>
                    </DialogHeader>

                    <DialogBody spaceY={3}>
                        <InputComponent
                            name='title'
                            label="Título de la tarea"
                            type="text"
                            placeholder="Título de la tarea"
                            disabled={isCreating || isUpdating}
                            register={register}
                            formErrors={formErrors}
                            rules={{
                                required: 'El Título de la tarea es obligatorio',
                            }}
                        />

                        <TextAreaComponent
                            name='description'
                            label="Descripción (opcional)"
                            placeholder="Descripción (opcional)"
                            disabled={isCreating || isUpdating}
                            register={register}
                            formErrors={formErrors}
                        />

                        {error && (
                            <Alert
                                status="error"
                                title={error}
                            />
                        )}
                    </DialogBody>

                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogActionTrigger>

                        <Button
                            type="submit"
                            loading={isCreating || isUpdating}
                            loadingText={editingTask ? "Actualizando tarea..." : "Agregando tarea..."}
                            bg="blue.600"
                            color='white'
                        >
                            {editingTask ? 'Actualizar' : 'Agregar'} Tarea
                        </Button>
                    </DialogFooter>

                </form>

            </DialogContent>
        </DialogRoot>
    )
}