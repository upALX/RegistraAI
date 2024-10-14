import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Subscribe from "./pages/login/SubscribePage";
import Login from "./pages/login/LoginPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Subscribe />} />
      </Routes>
    </Router>
  );
};

export default App;
