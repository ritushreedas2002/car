import React, { useState } from "react";
import axios from 'axios';

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const SearchBox = ({ setSelectPosition }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const params = {
      q: searchText,
      format: "json",
    };

    try {
      const response = await axios.get(NOMINATIM_BASE_URL, { params });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search for a place"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((item) => (
          <li
            key={item.place_id}
            className="cursor-pointer"
            onClick={() => {
              setSelectPosition({ lat: item.lat, lon: item.lon });
              setSearchResults([]); // Clear the search results after selection
              setSearchText("")
            }}
          >
            {item.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBox;
