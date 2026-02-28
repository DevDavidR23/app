import { Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import Home from "./pages/home.jsx";
function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home/>} />
        </Routes>
    )
}
export default AppRouter;