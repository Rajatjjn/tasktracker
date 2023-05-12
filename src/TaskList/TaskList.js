import React, { useState } from "react";
import Task from "../Task/Task";
import { nanoid } from "nanoid";
import style from "./TaskList.module.css";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");

  function HandleTitle(e) {
    setTitle(e.target.value);
  }
  function HandleDescription(e) {
    setDescription(e.target.value);
  }
  function HandleAddTask(e) {
    e.preventDefault();
    if (title !== "" && description !== "") {  //here i apply this condition that our both input be filled
      const work = {
        id: nanoid(),   // here i use nanoid  to give separate id
        title,
        description,
        completed: false,
      };

      setTasks([...tasks, work]);
      setTitle("");
      setDescription("");
    }
  }

  const HandleToggle = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  function HandleDelete(id) {          // here take id from onclick and filter out ids that is not clicked
    setTasks(tasks.filter((r) => r.id !== id));
  }

  let filteredTasks = tasks;     // this is for filtering the task
  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  } else if (filter === "uncompleted") {
    filteredTasks = tasks.filter((task) => !task.completed);
  }

  return (
    <>
      <div className={style.main}>
        <div className={style.wrapper}>
          <div>
            <h2 className={style.title}>Career Pillar solution</h2>
            <hr />
            <h4 className={style.header}>Task Tracker App</h4>
          </div>
          <form onSubmit={HandleAddTask}>
            <label>
              Title:
              <input
                type="text"
                value={title}
                placeholder="Enter your task title"
                onChange={HandleTitle}
              />
            </label>

            <br />
            <label>
              Description:
              <input
                type="text"
                placeholder="Give a short description"
                value={description}
                onChange={HandleDescription}
              />
            </label>
            <br />

            <button className={style.button} type="submit">
              Add Task
            </button>
          </form>
          <div>
            <h5>Filter your Tasks</h5>
            <button className={style.all} onClick={() => setFilter("all")}>
              All
            </button>{" "}
            <button
              className={style.complete}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>{" "}
            <button
              className={style.uncomplete}
              onClick={() => setFilter("uncompleted")}
            >
              Uncompleted
            </button>
          </div>
                
          {filteredTasks.map((tsk, index) => (  //  here i map through filterd tasks and pass details as props in our task component
            <Task
              key={tsk.id}
              id={tsk.id}
              title={tsk.title}
              description={tsk.description}
              completed={tsk.completed}
              HandleToggle={() => HandleToggle(tsk.id)}
              HandleDelete={HandleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
}
