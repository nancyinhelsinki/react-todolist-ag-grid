import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ToDoList from "./ToDoList";
function TabApp() {
  const [value, setValue] = useState("one");
  const handleChange = (event, value) => {
    setValue(value);
  };
  return (
    <div>
      <div>
        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="HOME" />
          <Tab value="two" label="TODOS" />
        </Tabs>
        {value === "one" && <div>Welcome to My To Do List!</div>}
        {value === "two" && (
          <div className="ToDoList">
            <ToDoList />
          </div>
        )}
      </div>
    </div>
  );
}
export default TabApp;
