import { useNavigate, Link} from "react-router-dom";
import api from "../api/api";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError("");
    setSuccess("");

    try {
      await api.post("/auth/signup", { name, email, password });

      setSuccess("Cadastro realizado com sucesso!");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Erro ao cadastrar. Tente novamente.");
      }
    }
    navigate("/login");
  }

  return(
   <section className="container">
 <h1>Cadastro</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button className="btn" type="submit">
          Cadastrar
        </button>
      </form>

      <p>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </section>
  )
}

export default Register;