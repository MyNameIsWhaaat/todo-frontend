import React, { useState } from "react";
import { createItem } from "../../API/Item_api";

const AddItemForm = ({ listId, onItemAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      console.error("Название не может быть пустым!");
      return;
    }

    try {
      await createItem(listId, title, description);
      setTitle("");
      setDescription("");
      if (onItemAdded) onItemAdded();
    } catch (error) {
      console.error("Ошибка при создании задачи:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-item-form">
      <input
        type="text"
        placeholder="Название задачи"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Описание (необязательно)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Добавить задачу</button>
    </form>
  );
};

export default AddItemForm;
