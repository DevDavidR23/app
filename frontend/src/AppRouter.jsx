import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login.jsx";
import Home from "./pages/home/home.jsx";
import Activity from "./pages/activitys/activity.jsx";
import Test from "./pages/test.jsx";
import PeriodDetail from "./pages/periodDetails/Perioddetails.jsx";
import ActivityDetail from "./pages/activityDetails/ActivityDetail.jsx";
function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/cursos/:periodId" element={<PeriodDetail />} />
            <Route path="/test" element={<Test />} />
            <Route path="/actividad/:activityId" element={<ActivityDetail />} />
        </Routes>
    )
}
export default AppRouter;