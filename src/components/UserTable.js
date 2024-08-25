import React from "react";
import "../styles/UserTable.scss";

const UserTable = ({ users, onSort, onRowClick, sortConfig }) => {
  const handleSort = (key) => {
    onSort(key);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? "↑" : "↓";
    }
    return "";
  };

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th className="resizable" onClick={() => handleSort("firstName")}>
            ФИО {getSortIcon("firstName")}
          </th>
          <th className="resizable" onClick={() => handleSort("age")}>
            Возраст {getSortIcon("age")}
          </th>
          <th className="resizable" onClick={() => handleSort("gender")}>
            Пол {getSortIcon("gender")}
          </th>
          <th className="resizable">Номер телефона</th>
          <th className="resizable" onClick={() => handleSort("address")}>
            Адрес {getSortIcon("address")}
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id} onClick={() => onRowClick(user)} className={index % 2 === 0 ? 'odd:bg-gray-100' : 'even:bg-white'}>
            <td>
              {user.firstName} {user.lastName}
            </td>
            <td>{user.age}</td>
            <td>{user.gender}</td>
            <td>{user.phone}</td>
            <td>
              {user.address.city}, {user.address.address}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
