import { useNavigate, Link} from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    navigate("/login");
  }

  return(
   <section className="container">
      <h1>Cadastro</h1>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nome" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Senha" />
        <button className="btn">Cadastrar</button>
      </form>
      <p>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </section>
  )
}

export default Register;