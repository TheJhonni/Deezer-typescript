import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import DetailPage from "./components/DetailPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/details/:id" element={<DetailPage />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
