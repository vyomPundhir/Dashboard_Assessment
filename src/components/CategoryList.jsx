import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeWidget } from '../app/store';

const CategoryList = ({ closeForm }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [pendingRemovals, setPendingRemovals] = useState({});
  const categories = useSelector(state => state.dashboard.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories]);

  const handleCheckboxChange = (categoryId, widget) => {
    setPendingRemovals(prev => ({
      ...prev,
      [widget.id]: !prev[widget.id]
    }));
  };

  const confirmRemovals = () => {
    Object.keys(pendingRemovals).forEach(widgetId => {
      if (pendingRemovals[widgetId]) {
        dispatch(removeWidget({ widgetId }));
      }
    });
    setPendingRemovals({});
    closeForm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-end">
      <div className="category bg-gradient-to-br from-[#ffffff] to-[#aed6f6] w-[40%] p-[20px] rounded-xl shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Category List</h2>
        <div className="flex flex-row flex-wrap mb-4">
          {categories.map(category => (
            <h3
              key={category.id}
              className={`cursor-pointer px-[10px] py-[3px] ${
                selectedCategory === category.id ? 'border-[1px] border-black shadow-lg rounded-lg bg-[#bee8f7] font-[700]' : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name.split(' ')[0]}
            </h3>
          ))}
        </div>

        {selectedCategory && (
          <div className='bg-[#bee8f7] shadow-2xl rounded-xl pb-[20px]'>
            <h3 className="text-lg font-[700] px-[20px] py-[10px] mb-2">Widgets</h3>
            {categories
              .find(category => category.id === selectedCategory)
              .widgets.map(widget => (
                <div key={widget.id} className="rounded-lg shadow-lg flex flex-row items-center mb-4 px-[10px] mx-[20px] py-[10px] font-[600] bg-[#d7e8f1]">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={!pendingRemovals[widget.id]}
                    onChange={() => handleCheckboxChange(selectedCategory, widget)}
                  />
                  <span>{widget.name}</span>
                </div>
              ))}

              <div className="px-[20px] flex flex-row flex-wrap justify-between items-center">
                <button
                onClick={confirmRemovals}
                className="mt-4 bg-blue-500 hover:bg-[#1f68dc] text-white py-[5px] px-[20px] rounded-lg shadow-xl"
                >
                  Confirm
                </button>

                <button onClick={closeForm} className="mt-4 bg-red-500 hover:bg-[#ce0101] text-white py-[5px] px-[20px] rounded-lg shadow-xl">
                  Close
                </button>

              </div>

          </div>
        )}
        
      </div>
    </div>
  );
};

export default CategoryList;



