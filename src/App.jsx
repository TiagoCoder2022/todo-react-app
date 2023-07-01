import React, { useEffect, useState } from 'react';
import styles from "./global.module.css";
import Taskitems from './components/Taskitems';
import DataAtual from './components/currentDate/DataAtual';

const getSavedTodos = () => {
  let stored = JSON.parse(localStorage.getItem("todo"));
  return stored || [];
};

function App() { 
  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState(getSavedTodos());

  const addTodo = (ev) => {
    ev.preventDefault();

    const todoItem = {
      id: new Date().getTime(),
      text: todo,
      isChecked: false
    };

    if (todo !== "") {
      const updatedTodos = [...allTodos].concat(todoItem).reverse();
      setAllTodos(updatedTodos);
      localStorage.setItem("todo", JSON.stringify(updatedTodos));
      setTodo("");
    }
  };

  const toggleChecked = (id) => {
    let updateTodos = [...allTodos].map(todo => {
      if (todo.id === id) {
        todo.isChecked = !todo.isChecked;
      }
      return todo;
    });
    setAllTodos(updateTodos);
  };

  const deleteTodo = (id) => {
    const filteredTodo = allTodos.filter(todo => todo.id !== id);
    setAllTodos(filteredTodo);
  };

  // Saving in localstorage
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(allTodos));
  }, [allTodos]);

  return (
    <div className={styles.boards}>
      <div className={styles.time_wrapper}>
        <DataAtual/>        
      </div>
      
      <div className={styles.board}>
        <h3>Todo List</h3>
        <form className={styles.task__form} onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Add new task"
            className={styles.task__input}
            value={todo}
            onChange={(ev) => setTodo(ev.target.value)}
          />
          <button className={styles.button} onClick={addTodo}>
            Add 
          </button>
        </form>
        
        <div className={styles.dropzone}>      
          {allTodos.map(todo => (
            <Taskitems
              key={todo.id} 
              deleteTodo={() => deleteTodo(todo.id)} 
              text={todo.text}
              isChecked={todo.isChecked} 
              toggleChecked={() => toggleChecked(todo.id)}
            />
          ))}
          {allTodos.length === 0 && (
            <p className={styles.empty}>There are no Todo's</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
