const API_URL = "http://localhost:8000/api";  
 
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};


export const createItem = async (listId, title, description) => {
    const response = await fetch(`${API_URL}/lists/${listId}/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
        },
        body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка создания задачи: ${response.status} - ${errorText}`);
    }

    return response.json();
};

export const getItems = async (listId) => {
    const response = await fetch(`${API_URL}/lists/${listId}/items`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
        },
    });

    if (!response.ok) {
        throw new Error(`Ошибка загрузки задач: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
        throw new Error("Сервер вернул не массив!");
    }

    return data;
};

export const deleteItem = async (itemId) => {
    const response = await fetch(`${API_URL}/items/${itemId}`, {
        method: "DELETE",
        headers: { ...getAuthHeaders() },
    });

    if (!response.ok) {
        throw new Error("Ошибка при удалении задачи");
    }

    console.log(`Задача ${itemId} удалена`);
};

export const updateItem = async (itemId, title, description) => {
    const response = await fetch(`${API_URL}/items/${itemId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
        },
        body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
        throw new Error("Ошибка при обновлении задачи");
    }

    console.log(`Задача ${itemId} обновлена`);
};
