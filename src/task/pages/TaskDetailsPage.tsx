import { useGetTaskByIdQuery } from '@/store/api/task/taskApi';
import { ErrorAlert } from '@/ui/components/ErrorAlert';
import { Loading } from '@/ui/components/Loading';
import { Container } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { TaskDetailsCard } from '../components';

export const TaskDetailsPage = () => {
    const { taskId } = useParams<{ taskId: string }>();

    const {
        data: task,
        isLoading,
        isError,
    } = useGetTaskByIdQuery(taskId as string);


    if (isLoading) {
        return <Loading />;
    }

    if (isError || !task?.isSuccess) {
        return (
            <ErrorAlert
                title='Error al cargar el detalle de la tarea. Por favor, inténtalo de nuevo.'
                message={task?.message || 'Ha ocurrido un error al cargar el detalle de la tarea. Por favor, inténtalo de nuevo.'}
            />
        );
    }

    const { data: taskData } = task;

    return (
        <Container maxW="container.md" py={8}>
            <TaskDetailsCard taskData={taskData} />
        </Container >
    );
};