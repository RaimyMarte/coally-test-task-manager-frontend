import { TaskInterface } from "@/interfaces";
import { Radio, RadioGroup } from "@/ui/components/chakra/radio";
import { Layout } from "@/ui/layout/Layout";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import 'dayjs/locale/es';
import { useState } from 'react';
import { TaskDialog, TaskList } from "../components";

export const TaskPage = () => {
  const [editingTask, setEditingTask] = useState<TaskInterface | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [filterValue, setFilterValue] = useState("all");

  const taskFilterOptions = [
    { label: "Todas", value: "all" },
    { label: "Pendientes", value: "false" },
    { label: "Completadas", value: "true" },
  ]

  return (
    <Layout>
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

        <Box mb={4}>
          <RadioGroup value={filterValue} onValueChange={(e) => setFilterValue(e.value)}>
            <Stack direction="row" spaceX={4}>
              {taskFilterOptions.map(option => (
                <Radio key={option.value} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Box>

        <TaskList
          setEditingTask={setEditingTask}
          setIsDialogOpen={setIsDialogOpen}
          filterValue={filterValue}
        />

      </Box>
    </Layout>
  );
};
