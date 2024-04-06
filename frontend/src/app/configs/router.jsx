import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux";
import Login from "../screens/login/Login";
import Home from "../screens/home/Home";
import Error404 from "../Error404";

const ProtectedRoute = ({ user, element }) => {
  return user ? element : <Navigate replace to="/login" />
}
const PrivateRoute = ({ user, element }) => {
  return user.roleId === 1 ? element : <Navigate replace to="/404" />
}

const Router = () => {
  const user = useSelector(state => state.session.user);

  return (
    <BrowserRouter>
      <Routes>
        {/*Public routes */}
        <Route path="/login" element={<Login type="Login" />} />
        <Route path="/signup" element={<Login type="Register" />} />
        <Route path="*" element={<Error404 />}  />

        {/*Private routes */}
        <Route path="/" element={<ProtectedRoute user={user} element={<Home />} />} />
      
        {/*Admin routes */}
        <Route path="/admin" element={<PrivateRoute user={user} element={<Home />} />} />

      </Routes>
    </BrowserRouter>
  )
}

export default Router