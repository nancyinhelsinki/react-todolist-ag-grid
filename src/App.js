import "./App.css";
import ToDoList from "./components/ToDoList";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <div className="App">
      <AppBar>
        <Toolbar>
          <Typography variant="h5">My ToDoList</Typography>
        </Toolbar>
      </AppBar>

      <ToDoList />
    </div>
  );
}

export default App;
