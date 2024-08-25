import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWidget } from '../app/store';

const AddWidgetForm = ({ categoryId, closeForm }) => {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const dispatch = useDispatch();

  const handleAddWidget = () => {

    if (!widgetName || !widgetText) {
      alert('Please fill out both fields.');
      return;
    }

    const newWidget = {
      id: `widget-${Date.now()}`,
      name: widgetName,
      text: widgetText
    };
    dispatch(addWidget({ categoryId, widget: newWidget }));
    closeForm();
  };

  return (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-50 flex justify-center items-center">
      <div className="bg-gradient-to-br from-[#ffffff] to-[#aed6f6] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Widget</h2>
        <input
          type="text"
          placeholder="Widget Name"
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md shadow-lg"
          required
        />
        <textarea
          placeholder="Widget Text"
          value={widgetText}
          onChange={(e) => setWidgetText(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md shadow-lg"
          required
        />
        <div className="flex justify-between">
          <button onClick={handleAddWidget} className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-xl hover:bg-[#1f68dc]">Add Widget</button>
          <button onClick={closeForm} className="bg-red-500 hover:bg-[#ce0101] text-white py-2 px-4 rounded-lg shadow-xl">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddWidgetForm;
