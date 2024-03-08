import React, { useState, useEffect } from "react";
import "./style.css";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    return localValue ? JSON.parse(localValue) : [];
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    if (newItem.trim() !== "") {
      setTodos((currentTodos) => [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ]);
      setNewItem("");
    }
  }

  function toggleTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  function editTodo(id, newTitle) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title: newTitle };
        }
        return todo;
      });
    });
  }

  function toggleEdit(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, editing: !todo.editing } : todo
      )
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.length === 0 && "No Todos"}
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              {todo.editing ? (
                <input
                  type="text"
                  value={todo.title}
                  onChange={(e) => editTodo(todo.id, e.target.value)}
                  onBlur={() => toggleEdit(todo.id)}
                  autoFocus
                />
              ) : (
                <span
                  className={`todo-title ${todo.completed ? "completed" : ""}`}
                  onClick={() => toggleEdit(todo.id)}
                  style={{ cursor: "pointer" }}
                >
                  {todo.title}
                </span>
              )}
            </label>
            <div className="button-group">
              <button
                onClick={() => toggleEdit(todo.id)}
                className="btn edit-btn"
              >
                {todo.editing ? "Save" : "Edit"}
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn delete-btn"
              >
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
