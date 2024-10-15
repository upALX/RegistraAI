import { SubmitHandler } from "react-hook-form";
import AuthForm from "../../components/subscribe";
import { AuthTypes } from "../../types/auth-types";
import { graphqlRequest } from "../../connectors/graphql-connector";
import { gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const router = useNavigate();
  const onSubmit: SubmitHandler<AuthTypes> = async (data) => {
    const LOGIN_MUTATION = gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          success
          message
          user {
            id
            name
            email
          }
        }
      }
    `;

    try {
      const response = await graphqlRequest("mutation", LOGIN_MUTATION, {
        email: data.email,
        password: data.password,
      });

      if (response.login.success) {
        console.log("Login successful:", response);
        router("/tarefas");
      } else {
        console.error("Login failed:", response.login.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="grid justify-center items-center h-screen">
      <AuthForm onSubmit={onSubmit} isLoginForm={true} />
    </div>
  );
};

export default Login;
