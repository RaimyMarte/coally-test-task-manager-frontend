import { TaskInterface } from '@/interfaces';
import { useUpdateTaskMutation } from '@/store/api/task/taskApi';
import { Button } from '@/ui/components/chakra/button';
import { Tooltip } from '@/ui/components/chakra/tooltip';
import { formatDate } from '@/utils';
import {
    Badge,
    Box,
    CardBody,
    CardRoot,
    Flex,
    Heading,
    Icon,
    Text,
    VStack
} from '@chakra-ui/react';
import { ArrowBigLeft, Calendar, Edit, Timer } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskDialog } from '../components';
import { handleToggleComplete } from '../helpers/handleToggleComplete';
import { Loading } from '@/ui/components/Loading';

interface TaskDetailsCardProps {
    taskData: TaskInterface;
    isLoading: boolean;
}

export const TaskDetailsCard = ({ taskData, isLoading }: TaskDetailsCardProps) => {
    const navigate = useNavigate();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<TaskInterface | null>(null);

    const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

    const handleToggleStatus = async () => handleToggleComplete(taskData, updateTask);

    const handleEditTask = () => {
        setEditingTask(taskData);
        setIsDialogOpen(true);
    };

    if (isLoading) {
        return <Loading />;
    }


    return (
        <CardRoot shadow="lg" variant="elevated">
            <CardBody>
                <VStack spaceY={2} align="stretch">
                    <Flex
                        justify="space-between"
                        align="center"
                        wrap="wrap"
                        gap={4}
                        borderBottom="1px"
                        borderColor="gray.100"
                        pb={4}
                    >
                        <Box flex="1">
                            <Text color={{ base: "gray.500", _dark: "gray.400" }} fontSize="sm">
                                Tarea
                            </Text>
                            <Heading size="lg" color={{ base: "gray.700", _dark: "gray.100" }}>
                                {taskData?.title}
                            </Heading>
                        </Box>

                        <Tooltip content="Cambiar estado de la tarea">
                            <Badge
                                colorPalette={taskData?.completed ? 'green' : 'blue'}
                                p={3}
                                px={4}
                                borderRadius="full"
                                cursor="pointer"
                                onClick={handleToggleStatus}
                                fontSize="md"
                                textTransform="none"
                                boxShadow="sm"
                                transition="all 0.2s"
                                _hover={{
                                    transform: 'translateY(-1px)',
                                    boxShadow: 'md',
                                }}
                            >
                                {taskData?.completed ? 'Completada' : 'Pendiente'}
                            </Badge>
                        </Tooltip>
                    </Flex>

                    {taskData?.description && (
                        <Box
                            bg={{ base: "gray.100", _dark: "gray.800" }}
                            p={5}
                            rounded="lg"
                            borderLeft="4px"
                            borderColor={{ base: "blue.400", _dark: "blue.300" }}
                        >
                            <Text color={{ base: "gray.600", _dark: "gray.300" }} fontSize="md" mb={3} fontWeight="medium">
                                Descripción
                            </Text>
                            <Text color={{ base: "gray.700", _dark: "gray.100" }} whiteSpace="pre-wrap" lineHeight="tall">
                                {taskData?.description}
                            </Text>
                        </Box>
                    )}

                    <VStack spaceY={4} align="stretch" pt={2}>
                        <Flex align="center" gap={3}>
                            <Icon color={{ base: "blue.500", _dark: "blue.400" }} boxSize={5}>
                                <Calendar />
                            </Icon>
                            <Box>
                                <Text fontSize="sm" color={{ base: "gray.500", _dark: "gray.400" }} mb={1}>
                                    Fecha de creación
                                </Text>
                                <Text color={{ base: "gray.700", _dark: "gray.100" }} fontWeight="medium">
                                    {formatDate(taskData?.createdAt)}
                                </Text>
                            </Box>
                        </Flex>

                        <Flex align="center" gap={3}>
                            <Icon color={{ base: "purple.500", _dark: "purple.400" }} boxSize={5}>
                                <Timer />
                            </Icon>
                            <Box>
                                <Text fontSize="sm" color={{ base: "gray.500", _dark: "gray.400" }} mb={1}>
                                    Última actualización
                                </Text>
                                <Text color={{ base: "gray.700", _dark: "gray.100" }} fontWeight="medium">
                                    {formatDate(taskData?.lastUpdatedAt)}
                                </Text>
                            </Box>
                        </Flex>
                    </VStack>

                    <Flex
                        justify="flex-end"
                        gap={{ base: 1, sm: 3 }}
                        pt={4}
                        borderTop="1px"
                        borderColor="gray.100"
                        mt={2}
                    >
                        <Button
                            variant="ghost"
                            onClick={() => navigate(-1)}
                            size="lg"
                            loading={isUpdating}
                            loadingText='Actualizando tarea...'
                        >
                            <ArrowBigLeft /> Volver
                        </Button>

                        <Button
                            color='white'
                            bg="blue.600"
                            size="lg"
                            loading={isUpdating}
                            loadingText='Actualizando tarea...'
                            onClick={handleEditTask}
                        >
                            <Edit /> Editar tarea
                        </Button>
                    </Flex>
                </VStack>

                <TaskDialog
                    showAddButton={false}
                    editingTask={editingTask}
                    isDialogOpen={isDialogOpen}
                    setEditingTask={setEditingTask}
                    setIsDialogOpen={setIsDialogOpen}
                />
            </CardBody>
        </CardRoot>
    );
};