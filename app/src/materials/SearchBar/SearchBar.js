import React, { useState } from "react";
import List from "../List/List";
import ListItem from "../List/ListItem";
import "./SearchBar.scss";
const SearchBar = ({ array }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = array.filter((value) => {
      return value?.title?.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={"Rechercher..."}
          value={wordEntered}
          onFocus={() => wordEntered === "" && setFilteredData(array)}
          // onBlur={() => {
          //   setWordEntered("");
          //   setFilteredData([]);
          // }}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <i className="gg-search"></i>
          ) : (
            <i onClick={clearInput} className="gg-close-o"></i>
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          <List>
            {filteredData.slice(0, 15).map((value, index) => {
              return (
                <ListItem key={index}>
                  <a onClick={clearInput} href={`#${value.id}`}>
                    {value.title}
                  </a>
                </ListItem>
              );
            })}
          </List>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
