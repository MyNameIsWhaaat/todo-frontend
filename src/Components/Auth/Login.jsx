import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../API/Auth_api";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(username, password);
      navigate("/"); 
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Войти</button>
      </form>
      <p>
        Нет аккаунта?{" "}
        <button onClick={() => navigate("/register")}>Зарегистрироваться</button>
      </p>
    </div>
  );
};

export default Login;
