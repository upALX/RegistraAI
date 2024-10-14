import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  Input,
  FormControl,
  FormErrorMessage,
  Box,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};

function App() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (
    data: Record<string, unknown>
  ) => {
    console.log(data);
  };

  const navigate = useNavigate();

  return (
    <div className="grid justify-center items-center h-screen bg-slate-950 ">
      <Box className="flex flex-col p-8 shadow-lg rounded-lg bg-zinc-900">
        <Heading className="text-center text-2xl ">Entrar</Heading>

        <div className="flex gap-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormControl isInvalid={!!errors.email}>
              <Input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
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
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                className="border-gray-300 p-2 rounded-lg"
              />

              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <span
              className="text-sm hover:underline cursor-pointer text-right"
              onClick={() => navigate("/cadastro")}
            >
              Clique para cadastrar
            </span>

            <Button
              type="submit"
              className="bg-zinc-500 hover:bg-zinc-800"
              size={"sm"}
            >
              Entrar
            </Button>
          </form>
        </div>
      </Box>
    </div>
  );
}

export default App;
