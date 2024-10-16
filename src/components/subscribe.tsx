import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  FormControl,
  FormErrorMessage,
  Box,
  Heading,
} from "@chakra-ui/react";

export type FormValues = {
  email: string;
  password: string;
  name?: string;
};

interface AuthFormProps {
  onSubmit: SubmitHandler<FormValues>;
  isLoginForm: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isLoginForm }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const navigate = useNavigate();
  const handleNavigateToRegister = () => {
    navigate("/cadastro");
  };

  return (
    <Box className="flex flex-col p-16 shadow-lg rounded-lg bg-zinc-900">
      <Heading className="text-center text-2xl mb-6">
        {isLoginForm ? "Entrar" : "Cadastrar"}
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {!isLoginForm && (
          <FormControl isInvalid={!!errors.name}>
            <Input
              type="text"
              placeholder="Nome"
              {...register("name", {
                required: "Nome é obrigatório",
              })}
              className="border-gray-300 p-2 rounded-lg"
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
        )}

        <FormControl isInvalid={!!errors.email}>
          <Input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email é obrigatório",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Endereço de email inválido",
              },
            })}
            className="border-gray-300 p-2 rounded-lg"
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <Input
            type="password"
            placeholder="Senha"
            {...register("password", {
              required: "Senha é obrigatória",
              minLength: {
                value: 6,
                message: "A senha deve ter pelo menos 6 caracteres",
              },
            })}
            className="border-gray-300 p-2 rounded-lg"
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        {isLoginForm && (
          <span
            onClick={handleNavigateToRegister}
            className="text-right text-sm cursor-pointer hover:underline"
          >
            Clique para cadastrar
          </span>
        )}

        <Button
          type="submit"
          className="bg-zinc-500 hover:bg-zinc-800"
          size={"sm"}
        >
          {isLoginForm ? "Entrar" : "Cadastrar"}
        </Button>
      </form>
    </Box>
  );
};

export default AuthForm;
