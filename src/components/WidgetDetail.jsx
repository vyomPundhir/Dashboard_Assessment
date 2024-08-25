import React from 'react';
import bargraph from '../assets/bargraph.png'
import cross from '../assets/cross.png'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { removeWidget } from '../app/store';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Pie, Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const WidgetDetail = () => {
  const { widgetId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const renderChart = () => {
    const chartOptions = {
      maintainAspectRatio: false, 
    };

    switch (widget.type) {
      case 'pieChart':
        return <Pie data={widget.data} options={chartOptions} width={200} height={200} />;
      case 'doughnutChart':
        return <Doughnut data={widget.data} options={chartOptions} width={200} height={200} />;
      case 'barChart':
        return <Bar data={widget.data} options={chartOptions} width={200} height={200} />;
      case 'emptyChart':
        return <p>No Graph data available!</p>;
      default:
        return null;
    }
  };

  const widget = useSelector(state => 
    state.dashboard.categories.flatMap(category => category.widgets)
    .find(widget => widget.id === widgetId)
  );

  if (!widget) {
    return <div>No Widget found</div>;
  }

  const handleRemoveWidget = () => {
    dispatch(removeWidget({ widgetId: widget.id }));
    navigate('/');
  };

  return (
    <div className='shadow-lg w-full flex flex-col items-center gap-[15px] my-4 px-[20px] py-[20px] border rounded-lg bg-[#d1e3f0]'>
      <div className="shadow-lg bg-gradient-to-br from-[#ffffff] to-[#c6ddf1] flex flex-col items-center gap-[15px] pl-[10px] pr-[5px] py-[5px] border rounded-xl w-[280px] h-[300px]">
      <div className="flex justify-between items-center w-full">
        <h3 className='text-[15px] font-[700] pt-[5px]'>{widget.name}</h3>
        <button className="w-[20px] h-[20px] rounded-full border-[1.5px] border-[red] " onClick={handleRemoveWidget}>
          <img src={cross} alt=""/>
        </button>
      </div>
      {widget.data ? (
        <div className="chart-container" style={{ width: '220px', height: '220px' }}>
          {renderChart()}
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center gap-[10px] w-[200px] h-[200px]'>
          <img src={bargraph} alt='No graph image' className='w-[30px] h-[30px]'/>
          <p>{widget.text}</p>
        </div>
        
      )}
      </div>

      <button className="hover:bg-[#1f68dc] mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg" onClick={() => navigate('/')}>
        Back to Dashboard
      </button>
    </div>
    
  );
}

export default WidgetDetail;

