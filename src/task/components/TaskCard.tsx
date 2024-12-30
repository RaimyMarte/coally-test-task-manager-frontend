import { TaskInterface } from "@/interfaces";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/store/api/task/taskApi";
import { Checkbox } from "@/ui/components/chakra/checkbox";
import { toaster } from "@/ui/components/chakra/toaster";
import { Tooltip } from "@/ui/components/chakra/tooltip";
import { isMutationSuccessResponse } from "@/utils";
import {
    CardDescription,
    CardHeader,
    CardRoot,
    CardTitle,
    Flex,
    IconButton,
    Box,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Link as RouterLink } from "react-router-dom";

interface TaskCardProps {
    task: TaskInterface;
    setEditingTask: Dispatch<SetStateAction<TaskInterface | null>>;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export const TaskCard = ({ task, setEditingTask, setIsDialogOpen }: TaskCardProps) => {
    const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
    const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

    const handleDeleteTask = async (id: string) => {
        try {
            const response = await deleteTask(id);

            if (isMutationSuccessResponse(response)) {
                const { data: respData } = response;

                if (!respData?.isSuccess) {
                    toaster.create({
                        title: respData?.title,
                        description: respData?.message,
                        type: "error",
                    });
                    return;
                }

                toaster.create({
                    title: respData?.title,
                    description: respData?.message,
                    type: "success",
                });
            }
        } catch (error) {
            toaster.create({
                title: "Error",
                description: `Ha ocurrido un error: ${error}`,
                type: "error",
            });
        }
    };

    const handleToggleComplete = async (task: TaskInterface) => {
        try {
            const response = await updateTask({
                taskId: task?._id,
                body: {
                    title: task?.title,
                    description: task?.description,
                    completed: !task?.completed,
                },
            });

            if (isMutationSuccessResponse(response)) {
                const { data: respData } = response;

                if (!respData?.isSuccess) {
                    toaster.create({
                        title: respData?.title,
                        description: respData?.message,
                        type: "error",
                    });
                    return;
                }

                toaster.create({
                    title: respData?.title,
                    description: respData?.message,
                    type: "success",
                });
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
        <CardRoot
            position="relative"
            _hover={{
                boxShadow: "lg",
                transform: "scale(1.02)",
                transition: "all 0.2s ease-in-out",
            }}
            borderRadius="md"
            boxShadow="md"
            p={2}
        >
            {(isUpdating || isDeleting) && (
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg={{ base: "rgba(255, 255, 255, 0.8)", _dark: "rgba(25, 25, 25, 0.8)" }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="md"
                    zIndex={1}
                >
                    <CardDescription fontSize="sm" color="gray.600">
                        {isDeleting ? "Eliminando..." : "Actualizando..."}
                    </CardDescription>
                </Box>
            )}

            <CardHeader pb={2}>
                <Flex direction={{ base: "column", sm: "row" }} justify="space-between" gap={2}>
                    <Flex align="center" gap={3}>
                        <Checkbox
                            checked={task?.completed}
                            onChange={() => handleToggleComplete(task)}
                            disabled={isUpdating || isDeleting}
                        />
                        <CardTitle
                            fontSize="lg"
                            color={task?.completed ? "gray.500" : "inherit"}
                            textDecoration={task?.completed ? "line-through" : "none"}
                        >
                            {task?.title}
                        </CardTitle>
                    </Flex>

                    <Flex gap={2} direction={{ base: "column", sm: "row" }} align="center">
                        <Tooltip content={`Detalles de ${task?.title}`}>
                            <IconButton
                                variant="subtle"
                                color={{ base: "blue.600", _dark: "blue.500" }}
                                as={RouterLink}
                                {...{ to: `/task/${task?._id}` }}
                                disabled={isUpdating || isDeleting}
                            >
                                <Eye size={16} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip content={`Editar ${task?.title}`}>
                            <IconButton
                                variant="subtle"
                                color={{ base: "teal.600", _dark: "teal.500" }}
                                onClick={() => {
                                    setEditingTask(task);
                                    setIsDialogOpen(true);
                                }}
                                disabled={isUpdating || isDeleting}
                            >
                                <Pencil size={16} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip content={`Eliminar ${task?.title}`}>
                            <IconButton
                                variant="subtle"
                                color={{ base: "gray.500", _dark: "gray.300" }}
                                onClick={() => handleDeleteTask(task?._id)}
                                disabled={isDeleting}
                            >
                                <Trash2 size={16} />
                            </IconButton>
                        </Tooltip>
                    </Flex>
                </Flex>

                <CardDescription fontSize="sm" color="gray.500">
                    Creada el {dayjs(task?.createdAt).format("D [de] MMMM[,] YYYY [a las] h:mm A")}
                </CardDescription>
            </CardHeader>
        </CardRoot>
    );
};
