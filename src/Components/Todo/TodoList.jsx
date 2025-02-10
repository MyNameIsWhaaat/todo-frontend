import React, { useEffect, useState } from "react";
import EditListModal from "./EditListModal";
import { getLists, createList, deleteList, updateList } from "../../API/List_api";
import { getItems, deleteItem, updateItem } from "../../API/Item_api";
import { logoutUser } from "../../API/Auth_api";
import { useNavigate } from "react-router-dom";
import AddItemForm from "./AddItemForm";

const TodoList = () => {
  const [lists, setLists] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedList, setSelectedList] = useState(null);
  const [items, setItems] = useState([]);
  const [editingList, setEditingList] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = async () => {
    try {
      const listsData = await getLists();
      setLists(listsData);
    } catch (error) {
      console.error("Ошибка загрузки списков:", error);
    }
  };

  const handleCreateList = async () => {
    try {
      await createList(title, description);
      await loadLists();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Ошибка при создании списка:", error);
    }
  };

  const handleDeleteList = async (id) => {
    try {
      await deleteList(id);
      setLists(lists.filter((list) => list.id !== id));
      if (selectedList && selectedList.id === id) {
        setSelectedList(null);
        setItems([]);
      }
    } catch (error) {
      console.error("Ошибка при удалении списка:", error);
    }
  };

  const handleSaveEdit = async (id, newTitle, newDescription) => {
    try {
      await updateList(id, newTitle, newDescription);
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === id ? { ...list, title: newTitle, description: newDescription } : list
        )
      );
      setEditingList(null);
    } catch (error) {
      console.error("Ошибка при обновлении списка:", error);
    }
  };

  const handleSelectList = async (list) => {
    setSelectedList(list);
    setItems([]);

    try {
      const itemsData = await getItems(list.id);
      console.log("Задачи:", itemsData);
      setItems(itemsData);
    } catch (error) {
      console.error("Ошибка загрузки элементов:", error);
    }
  };

  const handleItemAdded = async (listId) => {
    try {
      const updatedItems = await getItems(listId);
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === listId ? { ...list, items: updatedItems } : list
        )
      );
      console.log(`Обновлены задачи для списка ${listId}`);
    } catch (error) {
      console.error("Ошибка при обновлении задач:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItem(itemId);
      setItems(items.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditDescription(item.description || "");
  };

  const handleSaveEditItem = async () => {
    if (!editingItem) return;

    try {
      await updateItem(editingItem.id, editTitle, editDescription);
      setItems(items.map((item) =>
        item.id === editingItem.id
          ? { ...item, title: editTitle, description: editDescription }
          : item
      ));
      setEditingItem(null);
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
    }
  };

  return (
    <div className="container">
      <h1>Todo Lists</h1>
      <button className="logout-btn" onClick={handleLogout}>🚪 Выйти</button>
      <div className="form-container">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название списка"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Описание списка"
        />
        <button onClick={handleCreateList}>Создать список</button>
      </div>
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            <span className="list-header" onClick={() => handleSelectList(list)}>{list.title}</span>
            <span onClick={() => handleSelectList(list)}> {list.description}</span>
            <AddItemForm listId={list.id} onItemAdded={() => handleItemAdded(list.id)} />
            <div className="button-group">
              <button onClick={() => handleSelectList(list)}>📂 Открыть</button>
              <button onClick={() => setEditingList(list)}>✏️ Редактировать</button>
              <button className="delete" onClick={() => handleDeleteList(list.id)}>❌ Удалить</button>
            </div>
          </li>
        ))}
      </ul>

      {editingList && (
        <EditListModal
          list={editingList}
          onSave={handleSaveEdit}
          onClose={() => setEditingList(null)}
        />
      )}

      {selectedList && (
        <div className="list-container">
          <h2>Элементы списка: {selectedList.title}</h2>
          <ul>
            {items.length > 0 ? (
              items.map((item) => (
                <li key={item.id} className="task-item">
                  {editingItem && editingItem.id === item.id ? (
                    <>
                      <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                      <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                      <button onClick={handleSaveEditItem}>💾 Сохранить</button>
                      <button onClick={() => setEditingItem(null)}>❌ Отмена</button>
                    </>
                  ) : (
                    <>
                      {item.title} - {item.description || "Без описания"}
                      <div className="button-group">
                        <button onClick={() => handleEditItem(item)}>✏️</button>
                        <button className="delete" onClick={() => handleDeleteItem(item.id)}>❌</button>
                      </div>
                    </>
                  )}
                </li>
              ))
            ) : (
              <li>Здесь пока нет задач</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TodoList;
