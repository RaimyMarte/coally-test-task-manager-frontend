import { TaskInterface } from "@/interfaces";
import { useGetTasksQuery } from '@/store/api/task/taskApi';
import { ErrorAlert } from "@/ui/components/ErrorAlert";
import { Loading } from "@/ui/components/Loading";
import { CardBody, CardRoot, VStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { TaskCard } from "./TaskCard";

interface TaskListProps {
    setEditingTask: Dispatch<SetStateAction<TaskInterface | null>>;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
    filterValue: string;
}

export const TaskList = ({ setEditingTask, setIsDialogOpen, filterValue = 'all' }: TaskListProps) => {
    const { data: tasks, isLoading, isError } = useGetTasksQuery(filterValue);

    if (isLoading) {
        return <Loading />;
    }

    if (isError || !tasks?.isSuccess) {
        return (
            <ErrorAlert
                title='Error al cargar las tareas. Por favor, inténtalo de nuevo.'
                message={tasks?.message || 'Ha ocurrido un error al cargar las tareas. Por favor, inténtalo de nuevo.'}
            />
        );
    }

    return (
        <VStack spaceY={2} align="stretch">
            {tasks?.data?.map((task: TaskInterface) => (
                <TaskCard key={task?._id} task={task} setEditingTask={setEditingTask} setIsDialogOpen={setIsDialogOpen} />
            ))}
            {tasks?.data?.length === 0 && (
                <CardRoot>
                    <CardBody p={{ base: 6, sm: 8 }} textAlign="center" color="gray.500">
                        No hay tareas aún. ¡Haz clic en "Agregar Tarea" para crear una!
                    </CardBody>
                </CardRoot>
            )}
        </VStack>
    );
};
