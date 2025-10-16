import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
    const loc = useLocation();
    const user = localStorage.getItem("user");
    if (!user) return <Navigate to="/login" state={{ from: loc }} replace />;
    return children;
}
