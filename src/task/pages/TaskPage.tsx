import { CardBody, CardDescription, CardHeader, CardRoot, CardTitle, Input, Textarea } from "@chakra-ui/react"
import { Button } from "@/ui/components/chakra/button";
import { Checkbox } from "@/ui/components/chakra/checkbox";
import {
  DialogActionTrigger,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/ui/components/chakra/dialog";
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { TaskInterface } from "@/interfaces";
import { Loading } from "@/ui/components/Loading";
import { useCreateTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from '@/store/api/task/taskApi';

export const TaskPage = () => {
  const [newTask, setNewTask] = useState<Partial<TaskInterface>>({});
  const [editingTask, setEditingTask] = useState<TaskInterface | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // RTK Query hooks
  const { data: tasks, isLoading } = useGetTasksQuery();
  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  dayjs.locale('es');

  const onOpenDialog = () => setIsDialogOpen((prev) => !prev);

  const handleAddTask = async () => {
    if (!newTask.title) return;

    try {
      await createTask({
        title: newTask.title,
        description: newTask.description || null,
      });
      setNewTask({});
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async () => {
    if (!editingTask) return;

    try {
      await updateTask({
        taskId: editingTask._id,
        body: {
          title: editingTask.title,
          description: editingTask.description,
          completed: editingTask.completed,
        },
      });
      setEditingTask(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      console.log(id)
      await deleteTask(id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleComplete = async (task: TaskInterface) => {
    try {
      await updateTask({
        taskId: task?._id,
        body: {
          title: task?.title,
          description: task?.description,
          completed: !task?.completed,
        },
      });
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Lista de Tareas</h1>
        <DialogRoot open={isDialogOpen} onOpenChange={onOpenDialog}>
          <DialogTrigger asChild>
            <Button
              className="flex items-center gap-2 w-full sm:w-auto"
              disabled={isCreating}
            >
              <Plus className="w-4 h-4" /> Agregar Tarea
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-md mx-auto">
            <DialogCloseTrigger />
            <DialogHeader>
              <DialogTitle>
                {editingTask ? 'Editar Tarea' : 'Nueva Tarea'}
              </DialogTitle>
              <DialogDescription>
                Complete los detalles de la tarea
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Título de la tarea"
                value={editingTask?.title || newTask.title || ''}
                onChange={(e) =>
                  editingTask
                    ? setEditingTask({ ...editingTask, title: e.target.value })
                    : setNewTask({ ...newTask, title: e.target.value })
                }
              />
              <Textarea
                placeholder="Descripción (opcional)"
                value={editingTask?.description || newTask.description || ''}
                onChange={(e) =>
                  editingTask
                    ? setEditingTask({ ...editingTask, description: e.target.value })
                    : setNewTask({ ...newTask, description: e.target.value })
                }
              />
            </div>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogActionTrigger>

              <Button
                onClick={editingTask ? handleUpdateTask : handleAddTask}
                disabled={isCreating || isUpdating}
              >
                {editingTask ? 'Actualizar' : 'Agregar'} Tarea
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      </div>

      <div className="space-y-4">
        {tasks?.data?.map((task: TaskInterface) => (
          <CardRoot key={task?._id} className="w-full">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={task?.completed}
                    onCheckedChange={() => handleToggleComplete(task)}
                    disabled={isUpdating}
                  />
                  <CardTitle className={`text-lg sm:text-xl ${task?.completed ? 'line-through text-gray-500' : ''}`}>
                    {task?.title}
                  </CardTitle>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingTask(task);
                      setIsDialogOpen(true);
                    }}
                    disabled={isUpdating}
                    className="flex-1 sm:flex-none"
                  >
                    <Pencil className="w-4 h-4" />
                    <span className="ml-2 sm:hidden">Editar</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDeleteTask(task?._id)}
                    disabled={isDeleting}
                    className="flex-1 sm:flex-none"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="ml-2 sm:hidden">Eliminar</span>
                  </Button>
                </div>
              </div>
              <CardDescription>
                Creada el {dayjs(task?.createdAt).format('D [de] MMMM[,] YYYY [a las] h:mm A')}
              </CardDescription>
            </CardHeader>
            {task?.description && (
              <CardBody>
                <p className="text-sm sm:text-base">{task?.description}</p>
              </CardBody>
            )}
          </CardRoot>
        ))}
        {tasks?.data?.length === 0 && (
          <CardRoot>
            <CardBody className="p-6 sm:p-8 text-center text-gray-500">
              No hay tareas aún. ¡Haz clic en "Agregar Tarea" para crear una!
            </CardBody>
          </CardRoot>
        )}
      </div>
    </div>
  );
};