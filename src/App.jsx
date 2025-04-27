import { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // ✅ Load todos from local storage on page load
  useEffect(() => {
    try {
      let storedTodos = JSON.parse(localStorage.getItem("todos"));
      if (storedTodos) {
        setTodos(storedTodos);
      }
    } catch (error) {
      console.error("Error loading todos from localStorage:", error);
      setTodos([]);
    }
  }, []);

  // ✅ Save todos to local storage whenever `todos` changes
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleEdit = (id) => {
    let todoToEdit = todos.find((i) => i.id === id);
    setTodo(todoToEdit.todo);
    setEditingId(id);
  };

  const handleAddOrUpdate = () => {
    if (todo.trim() === "") return;

    if (editingId) {
      // ✅ Update existing todo
      const updatedTodos = todos.map((item) =>
        item.id === editingId ? { ...item, todo } : item
      );
      setTodos(updatedTodos);
      setEditingId(null);
    } else {
      // ✅ Add new todo
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: uuidv4(), todo, isCompleted: false },
      ]);
    }

    setTodo(""); // Clear input
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl bg-violet-300 mx-auto my-5 rounded-xl p-5 min-h-[80vh]">
        <div className="addtodo">
          <h2 className="text-center text-lg font-bold">
            {editingId ? "Edit ToDo" : "Add a ToDo"}
          </h2>
          <input
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            type="text"
            className="w-80 my-5 border border-gray-400 p-2 rounded"
          />
          <button
            onClick={handleAddOrUpdate}
            className="bg-green-500 hover:bg-green-700 p-2 py-1 text-white rounded-md mx-6 text-sm font-bold"
          >
            {editingId ? "Update" : "Add"}
          </button>
        </div>

        <h1 className="text-center font-bold text-xl">Your ToDo</h1>

        <div className="todos">
          {todos.length === 0 && <div className="font-bold m-5">No ToDos to display</div>}
          {todos.map((item) => (
            <div
              key={item.id}
              className="todo flex justify-between items-center bg-white p-3 my-2 rounded-md shadow-md"
            >
              <div className="flex-1 break-words w-full text-wrap overflow-hidden">
                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.isCompleted}
                />
                <div className={item.isCompleted ? "line-through text-gray-500" : "text-black"}>
                  {item.todo}
                </div>
              </div>
              <div className="flex h-full">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="bg-violet-500 hover:bg-violet-700 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 hover:bg-red-700 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
