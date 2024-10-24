import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyNavbar from "./components/MyNavbar";
import Home from "./components/Home";
import List from "./pages/List";
import Details from "./components/Details";
import Orders from "./pages/Orders";
function App() {
  return (
    <div>
      <MyNavbar />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/book/list" element={<List/>}/>
      <Route path="/book/view/:bookId"element={<Details/>}/>
      <Route path="/book/orders"element={<Orders/>}/>

    </Routes>
    </div>
  );
}

export default App;
