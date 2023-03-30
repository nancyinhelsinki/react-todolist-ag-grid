import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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

  const changeDate = (newValue) => {
    setTodoInput({ ...todoInput, date: newValue });
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
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        marginTop="70px"
      >
        <TextField
          onChange={inputChanged}
          label="Description"
          variant="outlined"
          name="description"
          value={todoInput.description}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">
          <DatePicker value={todoInput.date} onChange={changeDate} />
        </LocalizationProvider>

        <TextField
          onChange={inputChanged}
          label="Priority"
          variant="outlined"
          name="priority"
          value={todoInput.priority}
        />
        <Button variant="contained" onClick={addTodo}>
          Add
        </Button>
        <Button variant="contained" color="error" onClick={deleteTodo}>
          Delete
        </Button>
      </Stack>
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
