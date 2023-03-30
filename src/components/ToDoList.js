import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function ToDoList() {
  const [todoInput, setTodoInput] = useState({
    description: "",
    date: "",
    priority: "",
  });
  const [todoList, setTodoList] = useState([]);
  const gridRef = useRef();
  const [columnDefs] = useState([
    {
      field: "description",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "date",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "priority",
      sortable: true,
      floatingFilter: true,
      comparator: (valueA, valueB) => {
        const valueALowercased = valueA.toLowerCase();
        const valueBLowercased = valueB.toLowerCase();

        if (valueALowercased === valueBLowercased) return 0;
        if (valueALowercased === "low") return -1;
        if (valueALowercased === "high") return 1;
        if (valueALowercased === "medium" && valueBLowercased === "low")
          return 1;
        if (valueALowercased === "medium" && valueBLowercased === "high")
          return -1;
      },
      filter: true,
      cellStyle: (params) =>
        params.value.toLowerCase() === "high"
          ? { color: "red" }
          : { color: "black" },
    },
  ]);

  const inputChanged = (event) => {
    console.log(event.target);
    setTodoInput({ ...todoInput, [event.target.name]: event.target.value });
  };

  const addTodo = (event) => {
    setTodoList([...todoList, todoInput]);
    setTodoInput({
      description: "",
      date: "",
      priority: "",
    });
  };
  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodoList(
        todoList.filter(
          (value, index) =>
            index.toString() !== gridRef.current.getSelectedNodes()[0].id
        )
      );
    } else {
      alert("Select row first");
    }
  };

  return (
    <div>
      <input
        onChange={inputChanged}
        type="text"
        placeholder="Description"
        name="description"
        value={todoInput.description}
      />
      <input
        onChange={inputChanged}
        type="date"
        placeholder="Date"
        name="date"
        value={todoInput.date}
      />
      <input
        onChange={inputChanged}
        type="text"
        placeholder="Priority"
        name="priority"
        value={todoInput.priority}
      />
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>
      <div
        className="ag-theme-material"
        style={{ height: 400, width: 600, margin: "auto" }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowSelection="single"
          rowData={todoList}
          columnDefs={columnDefs}
          animateRows={true}
        ></AgGridReact>
      </div>
    </div>
  );
}
export default ToDoList;
