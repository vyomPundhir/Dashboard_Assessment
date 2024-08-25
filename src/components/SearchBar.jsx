import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const widgets = useSelector(state => 
    state.dashboard.categories.flatMap(category => category.widgets)
  );

  const filteredWidgets = widgets.filter(widget => 
    widget.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleClick = (widget) => {
    setQuery('');
    navigate(`/widget/${widget.id}`);
  };

  return (
    <div className="w-[83%] border-[1.5px] rounded-lg border-[#989898]">
      <input
        type="text"
        placeholder="Search widgets..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded-lg p-2 w-full"
      />
      {query && (
        <div className="mt-2 bg-white p-2 shadow-lg rounded-lg">
          {filteredWidgets.length > 0 ? (
            filteredWidgets.map(widget => (
              <div 
                key={widget.id} 
                className="p-2 cursor-pointer rounded-md hover:bg-gray-100"
                onClick={() => handleClick(widget)}
              >
                <h3>{widget.name}</h3>
                <p>{widget.text}</p>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
