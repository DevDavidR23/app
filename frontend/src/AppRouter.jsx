import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login.jsx";
import Home from "./pages/home/home.jsx";
import Activity from "./pages/activitys/activity.jsx";
import Test from "./pages/test.jsx";
function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/activity" element={<Activity />} />
            
            <Route path="/test" element={<Test />} />
        </Routes>
    )
}
export default AppRouter;