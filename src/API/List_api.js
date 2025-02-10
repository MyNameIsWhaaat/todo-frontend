const API_URL = "http://localhost:8000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getLists = async () => {
  const response = await fetch(`${API_URL}/lists`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error("Ошибка загрузки списков");
  }

  const data = await response.json();
  console.log("Списки задач:", data);

  if (!Array.isArray(data.data)) {
    throw new Error("Сервер вернул не массив!");
  }

  return data.data;
};

export const createList = async (title, description) => {
  const response = await fetch(`${API_URL}/lists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({
      title,
      description: description.trim(),
    }),
  });

  if (!response.ok) {
    throw new Error("Ошибка создания списка");
  }

  return await response.json();
};

export const deleteList = async (listId) => {
  console.log(`Удаляем список с ID: ${listId}`);

  const response = await fetch(`${API_URL}/lists/${listId}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error("Ошибка при удалении списка");
  }

  console.log(`Список ${listId} удалён`);
};

export const updateList = async (listId, title, description) => {
  console.log(`Обновляем список с ID: ${listId}`);

  const response = await fetch(`${API_URL}/lists/${listId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ title, description }),
  });

  if (!response.ok) {
    throw new Error("Ошибка при обновлении списка");
  }

  return await response.json();
};