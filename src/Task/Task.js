import React from "react";
import style from "./Task.module.css";

// here we received these 6 as props
export default function Task({
  title,
  description,
  completed,
  id,
  HandleToggle,
  HandleDelete,
}) {
  return (
    <div className={style.task}>
      <h2>{title}</h2>
      <p>{description}</p>
      <label>
        <input type="checkbox" checked={completed} onChange={HandleToggle} />
        completed
      </label>
      <button onClick={() => HandleDelete(id)}>Delete task</button> 
    </div>
  );
}
