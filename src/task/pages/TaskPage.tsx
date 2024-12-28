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


export const TaskPage = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [newTask, setNewTask] = useState<Partial<TaskInterface>>({});
  const [editingTask, setEditingTask] = useState<TaskInterface | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  dayjs.locale('es');

  const onOpenDialog = () => setIsDialogOpen((prev) => !prev);


  const handleAddTask = () => {
    if (!newTask.title) return;

    const task: TaskInterface = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTask.title,
      description: newTask.description || null,
      completed: false,
      owner: 'current-user',
      createdAt: new Date(),
    };

    setTasks([...tasks, task]);
    setNewTask({});
    setIsDialogOpen(false);
  };

  const handleUpdateTask = () => {
    if (!editingTask) return;

    setTasks(tasks.map((task) =>
      task.id === editingTask.id ? editingTask : task
    ));
    setEditingTask(null);
    setIsDialogOpen(false);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Lista de Tareas</h1>
        <DialogRoot open={isDialogOpen} onOpenChange={onOpenDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 w-full sm:w-auto">
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
                <Button variant="outline">Cancel</Button>
              </DialogActionTrigger>

              <Button
                onClick={editingTask ? handleUpdateTask : handleAddTask}
                className="w-full sm:w-auto"
              >
                {editingTask ? 'Actualizar' : 'Agregar'} Tarea
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <CardRoot key={task.id} className="w-full">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleToggleComplete(task.id)}
                  />
                  <CardTitle className={`text-lg sm:text-xl ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </CardTitle>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingTask(task);
                      setIsDialogOpen(true);
                    }}
                    className="flex-1 sm:flex-none"
                  >
                    <Pencil className="w-4 h-4" />
                    <span className="ml-2 sm:hidden">Editar</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDeleteTask(task.id)}
                    className="flex-1 sm:flex-none"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="ml-2 sm:hidden">Eliminar</span>
                  </Button>
                </div>
              </div>
              <CardDescription>
                Creada el {dayjs(task.createdAt).format('D [de] MMMM[,] YYYY [a las] h:mm A')}
              </CardDescription>
            </CardHeader>
            {task.description && (
              <CardBody>
                <p className="text-sm sm:text-base">{task.description}</p>
              </CardBody>
            )}
          </CardRoot>
        ))}
        {tasks.length === 0 && (
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