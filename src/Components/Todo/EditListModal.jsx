import React, { useState } from "react";

const EditListModal = ({ list, onSave, onClose }) => {
  const [title, setTitle] = useState(list.title);
  const [description, setDescription] = useState(list.description || "");

  const handleSave = () => {
    if (!title.trim()) return alert("Название не может быть пустым!");
    onSave(list.id, title, description);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Редактировать список</h2>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={handleSave}>💾 Сохранить</button>
        <button onClick={onClose}>❌ Отмена</button>
      </div>
    </div>
  );
};

export default EditListModal;
