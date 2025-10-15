import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    }catch(e){
      setError("Credenciais inválidas");
    }
  }

  return(
    <section>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <input type="text" placeholder="Email" className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <p className="error">{error}</p>}
        <button className="btn btn-primary" type="submit">
          Entrar
        </button>
        <p>
          Não tem conta? <Link to="/register">Registre-se</Link>
        </p>
      </form>
    </section>
  )
}

export default Login;