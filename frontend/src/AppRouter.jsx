import { Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
        </Routes>
    )
}
export default AppRouter;