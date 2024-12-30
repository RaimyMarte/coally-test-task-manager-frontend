import { useGetTaskByIdQuery } from '@/store/api/task/taskApi';
import { ErrorAlert } from '@/ui/components/ErrorAlert';
import { Layout } from '@/ui/layout/Layout';
import { useParams } from 'react-router-dom';
import { TaskDetailsCard } from '../components';
import { TaskInterface } from '@/interfaces';

export const TaskDetailsPage = () => {
    const { taskId } = useParams<{ taskId: string }>();

    const {
        data: task,
        isLoading,
        isError,
    } = useGetTaskByIdQuery(taskId as string);

    const taskData = task?.data as TaskInterface;

    return (
        <Layout>
            {
                isError || task?.isSuccess === false
                    ? <ErrorAlert
                        title='Error al cargar el detalle de la tarea. Por favor, inténtalo de nuevo.'
                        message={task?.message || 'Ha ocurrido un error al cargar el detalle de la tarea. Por favor, inténtalo de nuevo.'}
                    />
                    : <TaskDetailsCard isLoading={isLoading} taskData={taskData} />
            }
        </Layout >
    );
};