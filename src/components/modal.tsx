import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>();

  const onFormSubmit: SubmitHandler<TaskFormData> = (data) => {
    onSubmit(data);
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay className="bg-black bg-opacity-75" />
      <ModalContent
        className="bg-slate-950 p-8 rounded-lg flex flex-col justify-between"
        style={{ width: "50vw", height: "50vh", margin: "auto" }}
      >
        {/* Header */}
        <ModalHeader className="font-semibold text-center text-slate-400">
          Criar Nova Tarefa
        </ModalHeader>

        {/* Form Body */}
        <form id="taskForm" onSubmit={handleSubmit(onFormSubmit)}>
          <ModalBody className="flex flex-col gap-4 justify-center items-center">
            {/* Campo de Título */}
            <div className="w-full">
              <Input
                placeholder="Título"
                {...register("title", { required: "O título é obrigatório" })}
                className="p-2 rounded-lg w-full"
                isInvalid={!!errors.title}
              />
              {errors.title && (
                <span className="text-red-500 text-sm block mt-1">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* Campo de Descrição */}
            <div className="w-full">
              <Input
                placeholder="Descrição"
                {...register("description", {
                  required: "A descrição é obrigatória",
                })}
                className="p-2 rounded-lg w-full"
                isInvalid={!!errors.description}
              />
              {errors.description && (
                <span className="text-red-500 text-sm block mt-1">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Campo de Status */}
            <div className="w-full">
              <select
                {...register("status", { required: "O status é obrigatório" })}
                className="p-2 rounded-lg w-full"
                defaultValue="pending"
              >
                <option value="pending">Pendente</option>
                <option value="done">Concluído</option>
              </select>
              {errors.status && (
                <span className="text-red-500 text-sm block mt-1">
                  {errors.status.message}
                </span>
              )}
            </div>
          </ModalBody>
        </form>

        {/* Footer */}
        <ModalFooter className="mt-4">
          <Button type="submit" form="taskForm" className="">
            Registrar Tarefa
          </Button>
          <Button onClick={onClose} className="ml-4">
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
