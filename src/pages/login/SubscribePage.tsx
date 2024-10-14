import { SubmitHandler } from "react-hook-form";
import AuthForm from "../../components/subscribe";

const Subscribe = () => {
  const onSubmit: SubmitHandler<{ email: string; password: string }> = (
    data
  ) => {
    console.log(data);
  };

  return (
    <div className="grid justify-center items-center h-screen">
      <AuthForm onSubmit={onSubmit} isLoginForm={false} />
    </div>
  );
};

export default Subscribe;
