import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    status: "pending" | "done";
  }) => void;
};

type TaskFormData = {
  title: string;
  description: string;
  status: "pending" | "done";
};

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit, reset } = useForm<TaskFormData>();

  const onFormSubmit: SubmitHandler<TaskFormData> = (data) => {
    onSubmit(data); 
    onClose(); 
    reset(); 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay className="bg-black bg-opacity-75" />
      <ModalContent className="w-[50%] h-[50%] bg-white p-8 rounded-md mx-auto my-auto">
        <ModalHeader className="text-center text-slate-900">
          Criar Nova Tarefa
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <ModalBody className="flex flex-col gap-4">
            <Input
              placeholder="Título"
              {...register("title", { required: true })}
              className="border border-gray-300 p-2 rounded-lg"
            />
            <Input
              placeholder="Descrição"
              {...register("description", { required: true })}
              className="border border-gray-300 p-2 rounded-lg"
            />
            <select
              {...register("status", { required: true })}
              className="border border-gray-300 p-2 rounded-lg"
              defaultValue="pending"
            >
              <option value="pending">Pendente</option>
              <option value="done">Concluído</option>
            </select>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              className="bg-teal-500 hover:bg-teal-700 text-white"
            >
              Registrar Tarefa
            </Button>
            <Button onClick={onClose} className="ml-4">
              Cancelar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
