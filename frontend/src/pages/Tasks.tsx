import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="flex">
        <h1>Minhas Tarefas</h1>
        <button className="btn" onClick={logout}>
          Sair
        </button>
      </div>
      <p>Bem-vindo à sua lista de tarefas!</p>
    </div>
  );
};

export default Tasks;
