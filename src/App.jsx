import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SearchBar from './components/SearchBar';
import WidgetDetail from './components/WidgetDetail';
import CategoryList from './components/CategoryList';

const App = () => {
  const data = useSelector(state => state.dashboard);
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);

  return (
    <Router>
      <div className="shadow-lg bg-[#e8ecef] h-full w-full container flex flex-col items-center p-[20px] m-auto rounded-xl">
        <h1 className="text-3xl font-bold mb-4 text-left w-full">CNAPP Dashboard</h1>
        <div className="w-full flex flex-row justify-between items-center">
          <SearchBar/>
          <button
            onClick={() => setIsCategoryListOpen(true)}
            className="ml-4 bg-blue-500 hover:bg-[#1f68dc] text-white py-2 px-4 rounded-lg shadow-lg"
          >
            Category List
          </button>
        </div>
          

        {isCategoryListOpen && <CategoryList closeForm={() => setIsCategoryListOpen(false)} />}
        
        <Routes>
          <Route path="/" element={<Dashboard data={data} />} />
          <Route path="/widget/:widgetId" element={<WidgetDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App