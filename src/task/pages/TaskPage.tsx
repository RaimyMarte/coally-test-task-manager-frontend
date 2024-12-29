import { TaskInterface } from "@/interfaces";
import { Box, Flex, Heading } from "@chakra-ui/react";
import 'dayjs/locale/es';
import { useState } from 'react';
import { TaskDialog, TaskList } from "../components";

export const TaskPage = () => {
  const [editingTask, setEditingTask] = useState<TaskInterface | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Box maxW="4xl" mx="auto" p={{ base: 4, sm: 6 }}>
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

      <TaskList
        setEditingTask={setEditingTask}
        setIsDialogOpen={setIsDialogOpen}
      />

    </Box>
  );
};
