import { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Button,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import TaskModal from "../../components/modal";
import { Task } from "../../types/task-types";
import { gql } from "@apollo/client";
import { graphqlRequest } from "../../connectors/graphql-connector";

const BoardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitTask = async (taskData: {
    title: string;
    description: string;
    status: "pending" | "done";
  }) => {
    const CREATE_TASK_MUTATION = gql`
      mutation CreateTask(
        $title: String!
        $description: String!
        $status: String!
      ) {
        createTask(title: $title, description: $description, status: $status) {
          id
          title
          description
          status
        }
      }
    `;

    try {
      const response = await graphqlRequest(
        "mutation",
        CREATE_TASK_MUTATION,
        taskData
      );
      const newTask = response.createTask;
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Erro ao criar a tarefa:", error);
    }
  };

  return (
    <VStack p={10}>
      <Heading>Suas tarefas</Heading>
      <SimpleGrid columns={2} spacing={20} width="100%" height="100%">
        <Box className="rounded-lg border p-8" width="100%" height="100%">
          <Heading size="md" mb={4}>
            Pendente
          </Heading>
          <Button colorScheme="teal" onClick={handleOpenModal}>
            Criar Nova Tarefa
          </Button>
          {tasks.filter((task) => task.status === "pending").length === 0 ? (
            <Text mt={4}>Nenhuma tarefa pendente.</Text>
          ) : (
            tasks
              .filter((task) => task.status === "pending")
              .map((task) => (
                <Box
                  key={task.id}
                  borderWidth={1}
                  borderRadius="lg"
                  p={3}
                  mt={3}
                >
                  <Text fontWeight="bold">{task.title}</Text>
                  <Text>{task.description}</Text>
                </Box>
              ))
          )}
        </Box>

        <Box borderWidth={1} borderRadius="lg" p={5}>
          <Heading size="md" mb={4}>
            Concluído
          </Heading>
          {tasks.filter((task) => task.status === "done").length === 0 ? (
            <Text mt={4}>Nenhuma tarefa concluída.</Text>
          ) : (
            tasks
              .filter((task) => task.status === "done")
              .map((task) => (
                <Box
                  key={task.id}
                  borderWidth={1}
                  borderRadius="lg"
                  p={3}
                  mt={3}
                >
                  <Text fontWeight="bold">{task.title}</Text>
                  <Text>{task.description}</Text>
                </Box>
              ))
          )}
        </Box>
      </SimpleGrid>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitTask}
      />
    </VStack>
  );
};

export default BoardPage;
