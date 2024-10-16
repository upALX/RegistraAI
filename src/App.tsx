import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SubscribePage from "./pages/login/SubscribePage";
import LoginPage from "./pages/login/LoginPage";
import TasksPage from "./pages/tasks/tasks";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<SubscribePage />} />
        <Route path="/cadastro" element={<TasksPage />} />
      </Routes>
    </Router>
  );
};

export default App;
