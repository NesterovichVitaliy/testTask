import React, { useState, useEffect } from "react";
import UserTable from "./components/UserTable";
import SearchBar from "./components/SearchBar";
import Modal from "./components/Modal";
import "./styles/App.scss";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    (async () => {
      await fetchUsers();
    })();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      setUsers(data.users);
      setFilteredUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //Поиск по всем полям с использованием http-запросов
  const handleSearchClick = async (searchQuery) => { 
    if (!searchQuery) {
      setFilteredUsers(users);
      return;
    }
    const searchFields = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "phone",
      "city",
      "address",
    ];

    const searchResults = [];
    const addressParts = searchQuery.split(",").map((part) => part.trim());
    for (const field of searchFields) {
      let response;
      if (field === "city" || field === "address") {
        response = await fetch(`https://dummyjson.com/users/filter?key=address.${field}&value=${encodeURIComponent(addressParts[0])}`);
        const data = await response.json();
        const filteredData = data.users.filter((user) =>
          addressParts.length > 1
            ? user.address.address
                .toLowerCase()
                .includes(addressParts[1].toLowerCase())
            : true
        );
        searchResults.push(...filteredData);
      } else {
        response = await fetch(`https://dummyjson.com/users/filter?key=${field}&value=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        const filteredData = data.users.filter((user) =>
          users.some((u) => u.id === user.id));
        searchResults.push(...filteredData);
      }
    }
    setFilteredUsers(searchResults);
  };

  //Сортировка колонок с ФИО, возрастом, полом и адресом с тремя состояниями: по возрастанию, по убыванию, без сортировки
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    } else if (
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = null;
      key = null;
    }
    setSortConfig({ key, direction });

    if (direction === null) {
      setFilteredUsers([...users]); // Возвращаем массив в исходный вид
    } else {
      setFilteredUsers(
        [...filteredUsers].sort((a, b) => {
          if (key === "address") {
            const aValue = a[key].city;
            const bValue = b[key].city;
            if (direction === "ascending") {
              return aValue > bValue ? 1 : -1;
            } else if (direction === "descending") {
              return aValue < bValue ? 1 : -1;
            }
          } else {
            if (direction === "ascending") {
              return a[key] > b[key] ? 1 : -1;
            } else if (direction === "descending") {
              return a[key] < b[key] ? 1 : -1;
            }
          }
          return 0;
        })
      );
    }
  };

  //Закрывает модальное окно
  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="app">
      <SearchBar
        onClick={handleSearchClick}
        onRefresh={fetchUsers}
      />
      <UserTable
        users={filteredUsers}
        onSort={handleSort}
        onRowClick={setSelectedUser}
        sortConfig={sortConfig}
      />
      {selectedUser && <Modal user={selectedUser} onClose={closeModal} />}
    </div>
  );
};

export default App;