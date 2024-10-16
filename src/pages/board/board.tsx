import { useState } from "react";
import { Box, Heading, VStack, SimpleGrid, Text } from "@chakra-ui/react";
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
    <VStack p={10} height="100vh">
      <Heading className="text-lg font-semibold">Suas tarefas</Heading>
      <SimpleGrid columns={2} spacing={10} width="100%">
        <Box className="rounded-lg p-5 bg-slate-900 shadow-md">
          <Heading
            size="lg"
            mb={2}
            className="border-b pb-2 text-slate-400 font-semibold"
          >
            Pendente
          </Heading>
          <Box
            className="p-4 text-center cursor-pointer hover:bg-slate-800 transition-all"
            onClick={handleOpenModal}
          >
            <Text className="text-slate-500 font-semibold hover:underline">
              + Criar Nova Tarefa
            </Text>
          </Box>
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
                  className="bg-gray-100 hover:bg-gray-200 transition-all"
                >
                  <Text fontWeight="bold">{task.title}</Text>
                  <Text>{task.description}</Text>
                </Box>
              ))
          )}
        </Box>

        <Box className="rounded-lg border p-5 bg-slate-800 shadow-md">
          <Heading
            size="lg"
            mb={2}
            className="border-b pb-2 text-md font-extrabold"
          >
            Finalizado
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
                  className="bg-gray-100 hover:bg-gray-200 transition-all"
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
