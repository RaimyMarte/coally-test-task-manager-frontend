import { TaskInterface } from "@/interfaces";
import { Layout } from "@/ui/layout/Layout";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useState } from 'react';
import { TaskDeleteDialog, TaskDialog, TaskList, TasksFilter } from "../components";
import { useDeleteTaskMutation } from "@/store/api/task/taskApi";

export const TaskPage = () => {
  const [editingTask, setEditingTask] = useState<TaskInterface | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("all");

  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false);
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  return (
    <Layout>
      <Flex
        direction={{ base: "column", sm: "row" }}
        justify="space-between"
        align={{ base: "start", sm: "center" }}
        gap={{ base: 4, sm: 0 }}
        mb={6}
      >
        <Heading fontSize={{ base: "2xl", sm: "3xl" }}>Lista de Tareas</Heading>

        <TaskDialog
          editingTask={editingTask}
          isDialogOpen={isDialogOpen}
          setEditingTask={setEditingTask}
          setIsDialogOpen={setIsDialogOpen}
        />
      </Flex>

      <Box mb={4}>
        <TasksFilter
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      </Box>

      <TaskList
        setEditingTask={setEditingTask}
        setIsDialogOpen={setIsDialogOpen}
        isDeleting={isDeleting}
        setIsDeleteTaskDialogOpen={setIsDeleteTaskDialogOpen}
        filterValue={filterValue}
      />

      <TaskDeleteDialog
        isDeleteTaskDialogOpen={isDeleteTaskDialogOpen}
        setIsDeleteTaskDialogOpen={setIsDeleteTaskDialogOpen}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        deleteTask={deleteTask}
        isDeleting={isDeleting}
      />
    </Layout>
  );
};
