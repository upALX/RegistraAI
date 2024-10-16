import { SubmitHandler } from "react-hook-form";
import AuthForm from "../../components/subscribe";
import { AuthTypes } from "../../types/auth-types";
import { graphqlRequest } from "../../connectors/graphql-connector";
import { gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const SubscribePage = () => {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<AuthTypes> = async (data) => {
    const REGISTER_MUTATION = gql`
      mutation Register($name: String!, $email: String!, $password: String!) {
        register(name: $name, email: $email, password: $password) {
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
      const response = await graphqlRequest("mutation", REGISTER_MUTATION, {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.register.success) {
        console.log("Registration successful:", response);
        navigate("/login");
      } else {
        console.error("Registration failed:", response.register.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="grid justify-center items-center h-screen">
      <AuthForm onSubmit={onSubmit} isLoginForm={false} />
    </div>
  );
};

export default SubscribePage;
