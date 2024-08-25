import React, { useState } from "react";
import "../styles/SearchBar.scss";

const SearchBar = ({ onClick, onRefresh }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    onClick(query);
  };

  const handleRefreshClick = () => {
    onRefresh();
    setQuery("");
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar text-gray-900 border border-gray-300 focus:ring-gray-300 focus:border-gray-300 rounded-lg px-4 py-2 w-full"
        placeholder="Поиск..."
        value={query}
        onChange={handleInputChange}
      />
      <div className="button-container">
      <button className="btnSearch" 
      onClick={handleSearchClick}>Поиск</button>
      <button className="btnRefresh" 
      onClick={handleRefreshClick}>Обновить</button>
      </div>
    </div>
  );
};

export default SearchBar;
