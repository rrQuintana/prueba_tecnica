import { useSelector } from "react-redux";
import AnimatedPage from "../../shared/AnimatedPage"
import NavBar from "./components/NavBar";
import TableUsers from "./components/TableUsers";
import useGetUsers from "../../logic/hooks/useGetUsers";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

function Home() {
  const user = useSelector(state => state.session.user);
  const [ filters, setFilters ] = useState({ page: 1});
  
  const { data: users, isLoading, refetch } = useGetUsers(filters);
  const [ usersData, setUsersData ] = useState({ page: 1, totalPages: 1, users: [] });

  useEffect(() => {
    if (users) {
      setUsersData({
        page: users.page,
        totalPages: users.totalPages,
        users: users.users
      });
    }
  }, [users]);
  
  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  const handlePageChange = (event, page) => {
    setFilters({ ...filters, page: page });
  }

  console.log(user);

  return (
    <AnimatedPage>
      <div className="w-full h-full bg-white">
        <NavBar user={user} />
        <div className="p-12">
          {user.roleName === 'Admin' && ( 
            <Button variant="contained" color="primary">Crear usuario</Button> 
          )}
          <TableUsers rol={user.roleName} usersData={usersData} isLoading={isLoading} handlePageChange={handlePageChange} />
        </div>
      </div>
    </AnimatedPage>
  )
}

export default Home