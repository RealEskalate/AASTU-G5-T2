import React from "react";
import UserManagement from "./user-management";

function Users() {
  return (
    <div className="px-10">
      <div className="py-5 pb-10">
        <h1 className="text-2xl font-bold">Groups & Users</h1>
        <p className="text-gray-400">All</p>
      </div>
      <UserManagement/>
    </div>
  );
}

export default Users;
