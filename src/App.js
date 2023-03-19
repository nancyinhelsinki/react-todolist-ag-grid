import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function App() {
  const [todo, setTodo] = useState({ description: "", date: "", priority: "" });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();
  const [columnDefs] = useState([
    { field: "description", sortable: true, filter: true },
    { field: "date", sortable: true, filter: true },
    {
      field: "priority",
      sortable: true,
      comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
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
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const addTodo = (event) => {
    setTodos([...todos, todo]);
  };
  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (todo, index) =>
            index.toString() !== gridRef.current.getSelectedNodes()[0].id
        )
      );
    } else {
      alert("Select row first");
    }
  };

  return (
    <div>
      <div style={{ width: 510, margin: "auto" }}>
        <input
          type="text"
          onChange={inputChanged}
          placeholder="Description"
          name="description"
          value={todo.description}
        />
        <input
          type="date"
          onChange={inputChanged}
          placeholder="Date"
          name="date"
          value={todo.date}
        />
        <input
          type="text"
          onChange={inputChanged}
          placeholder="Priority"
          name="priority"
          value={todo.priority}
        />
        <button onClick={addTodo}>Add</button>
        <button onClick={deleteTodo}>Delete</button>
      </div>
      <div
        className="ag-theme-material"
        style={{ height: 400, width: 600, margin: "auto" }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowSelection="single"
          rowData={todos}
          columnDefs={columnDefs}
        ></AgGridReact>
      </div>
    </div>
  );
}

export default App;
