import { useSelector } from "react-redux";
import TableUsers from "./components/TableUsers";
import useGetUsers from "../../logic/hooks/useGetUsers";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Layout from "../../shared/Layout";
import { useNavigate } from 'react-router-dom';
import Filters from "./components/Filters";

function Home() {
  const user = useSelector(state => state.session.user);
  const navigation = useNavigate();
  const [filters, setFilters] = useState({ page: 1 });

  const { data: users, isLoading, refetch } = useGetUsers(filters);
  const [usersData, setUsersData] = useState({ page: 1, totalPages: 1, users: [] });

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

  return (
    <Layout>
      <div className="px-12 py-6">
        <div className="flex w-full justify-between items-center mb-4 border border-transparent border-b-zinc-300 pb-3">
          <React.Fragment>
            <Filters filters={filters} setFilters={setFilters} />
            {user.roleName === 'Admin' && (
              <Button onClick={() => navigation('/form-users/new')} variant="contained" color="primary">Crear usuario</Button>
            )}
          </React.Fragment>
        </div>
        <TableUsers rol={user.roleName} usersData={usersData} isLoading={isLoading} handlePageChange={handlePageChange} refetch={refetch} />
      </div>
    </Layout>
  )
}

export default Home