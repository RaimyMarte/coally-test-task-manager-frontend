import { TaskInterface } from "@/interfaces";
import { useGetTasksQuery } from '@/store/api/task/taskApi';
import { Loading } from "@/ui/components/Loading";
import { CardBody, CardRoot, VStack } from "@chakra-ui/react";
import { TaskCard } from "./TaskCard";
import { Dispatch, SetStateAction } from "react";

interface TaskListProps {
    setEditingTask: Dispatch<SetStateAction<TaskInterface | null>>;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export const TaskList = ({ setEditingTask, setIsDialogOpen }: TaskListProps) => {
    const { data: tasks, isLoading } = useGetTasksQuery();

    if (isLoading) {
        return <Loading />;
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
