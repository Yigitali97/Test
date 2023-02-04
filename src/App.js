import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import SingleDocument from "./pages/SingleDocument";
import CreateDocument from "./pages/CreateDocument";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/create" element={<CreateDocument />} />
        <Route path="/document/:id" element={<SingleDocument />} />
      </Routes>
    </div>
  );
}

export default App;
