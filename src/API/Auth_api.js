const API_URL = "http://localhost:8000/api";

export const loginUser = async (username, password) => {
  const response = await fetch("http://localhost:8000/auth/sign-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Ошибка авторизации");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token); 
  return data.token;
};

export const registerUser = async (name, username, password) => {
  const response = await fetch("http://localhost:8000/auth/sign-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, username, password }),
  });

  if (!response.ok) {
    throw new Error("Ошибка регистрации");
  }

  console.log("Регистрация успешна!");
  return await response.json();
};

export const logoutUser = () => {
    localStorage.removeItem("token");
    console.log("Выход выполнен, токен удалён"); 
};