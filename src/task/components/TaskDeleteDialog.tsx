import { ApiResponseInterface, TaskInterface } from "@/interfaces";
import { Button } from "@/ui/components/chakra/button";
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogRoot } from "@/ui/components/chakra/dialog";
import { toaster } from "@/ui/components/chakra/toaster";
import { isMutationSuccessResponse } from "@/utils";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { TypedMutationTrigger } from "@reduxjs/toolkit/query/react";
import { Dispatch, SetStateAction } from "react";

interface TaskDeleteDialogProps {
    editingTask: TaskInterface | null;
    isDeleting: boolean;
    deleteTask: TypedMutationTrigger<
        ApiResponseInterface,
        string,
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>
    >;
    isDeleteTaskDialogOpen: boolean;
    setIsDeleteTaskDialogOpen: Dispatch<SetStateAction<boolean>>;
    setEditingTask: Dispatch<SetStateAction<TaskInterface | null>>;
}

export const TaskDeleteDialog = ({ editingTask, deleteTask, isDeleting, isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen, setEditingTask }: TaskDeleteDialogProps) => {
    const onToggleDialog = () => setIsDeleteTaskDialogOpen((prev) => !prev);

    const onCloseDialog = () => {
        setIsDeleteTaskDialogOpen(false);
        setEditingTask(null);
    }

    const handleDeleteTask = async () => {
        try {
            const response = await deleteTask(editingTask?._id || '');

            if (isMutationSuccessResponse(response)) {
                const { data: respData } = response;

                if (!respData?.isSuccess) {
                    toaster.create({
                        title: respData?.title,
                        description: respData?.message,
                        type: "error",
                    });

                    onCloseDialog()
                }

                toaster.create({
                    title: respData?.title,
                    description: respData?.message,
                    type: "success",
                });

                onCloseDialog()
            }
        } catch (error) {
            toaster.create({
                title: "Error",
                description: `Ha ocurrido un error: ${error}`,
                type: "error",
            });
        }
    };

    return (
        <DialogRoot
            role="alertdialog"
            open={isDeleteTaskDialogOpen}
            onOpenChange={onToggleDialog}
            onExitComplete={onCloseDialog}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>¿Estás seguro de que quieres eliminar la tarea: "{editingTask?.title}"?</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <p>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente la tarea "{editingTask?.title}".
                    </p>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogActionTrigger>
                    <Button
                        loading={isDeleting}
                        loadingText='Eliminando tarea...'
                        colorPalette="red"
                        onClick={handleDeleteTask}
                    >
                        Eliminar
                    </Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )
}
