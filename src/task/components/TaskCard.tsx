import { TaskInterface } from "@/interfaces";
import { useUpdateTaskMutation } from "@/store/api/task/taskApi";
import { Checkbox } from "@/ui/components/chakra/checkbox";
import { Tooltip } from "@/ui/components/chakra/tooltip";
import { formatDate } from "@/utils";
import {
    Box,
    CardDescription,
    CardHeader,
    CardRoot,
    CardTitle,
    Flex,
    IconButton,
} from "@chakra-ui/react";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Link as RouterLink } from "react-router-dom";
import { handleToggleComplete } from "../helpers/handleToggleComplete";

interface TaskCardProps {
    task: TaskInterface;
    setEditingTask: Dispatch<SetStateAction<TaskInterface | null>>;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
    isDeleting: boolean;
    setIsDeleteTaskDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export const TaskCard = ({ task, isDeleting, setEditingTask, setIsDialogOpen, setIsDeleteTaskDialogOpen }: TaskCardProps) => {
    const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

    const handleToggleStatus = async (task: TaskInterface) => handleToggleComplete(task, updateTask);

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
            p={4}
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
                <Flex direction={{ base: "column", sm: "row" }} justify="space-between" gap={4}>
                    <Flex align="center" gap={4}>
                        <Checkbox
                            checked={task?.completed}
                            onChange={() => handleToggleStatus(task)}
                            disabled={isUpdating || isDeleting}
                            size="lg"
                        />
                        <CardTitle
                            fontSize={{ base: "md", sm: "lg" }}
                            color={task?.completed ? "gray.500" : "inherit"}
                            textDecoration={task?.completed ? "line-through" : "none"}
                        >
                            {task?.title}
                        </CardTitle>
                    </Flex>

                    <Flex
                        gap={3}
                        direction='row'
                        justify={{ base: "flex-start", sm: "flex-end" }}
                        align="center"
                    >
                        <Tooltip content={`Detalles de ${task?.title}`}>
                            <IconButton
                                variant="subtle"
                                color={{ base: "blue.600", _dark: "blue.500" }}
                                as={RouterLink}
                                {...{ to: `/task/${task?._id}` }}
                                disabled={isUpdating || isDeleting}
                                size={{ base: "md", sm: "lg" }}
                            >
                                <Eye size={20} />
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
                                size={{ base: "md", sm: "lg" }}
                            >
                                <Pencil size={20} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip content={`Eliminar ${task?.title}`}>
                            <IconButton
                                variant="subtle"
                                color={{ base: "gray.500", _dark: "gray.300" }}
                                disabled={isDeleting}
                                onClick={() => {
                                    setEditingTask(task);
                                    setIsDeleteTaskDialogOpen(true);
                                }}
                                size={{ base: "md", sm: "lg" }}
                            >
                                <Trash2 size={20} />
                            </IconButton>
                        </Tooltip>
                    </Flex>
                </Flex>

                <CardDescription fontSize="sm" color="gray.500">
                    Creada el {formatDate(task?.createdAt)}
                </CardDescription>
            </CardHeader>
        </CardRoot>
    );
};
