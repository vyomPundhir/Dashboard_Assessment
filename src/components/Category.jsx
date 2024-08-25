import React from 'react'
import Widget from './Widget'
import AddWidgetButton from './AddWidgetButton'

const Category = ({category}) => {
  return (
    <div className="shadow-lg flex flex-col items-center gap-[15px] my-4 px-[20px] pt-[10px] pb-[20px] border rounded-lg bg-[#d1e3f0]">
      <h2 className="w-full text-[20px] font-[700]">{category.name}</h2>
      <div className="w-full flex flex-row justify-start items-center flex-wrap gap-[20px]">
        {category.widgets.map(widget => (
          <Widget key={widget.id} widget={widget} />
        ))}
        <div className="shadow-lg bg-gradient-to-br from-[#ffffff] to-[#dce7f0] flex flex-col items-center justify-center p-4 bg-gray-100 border rounded-xl w-[280px] h-[300px]">
          <AddWidgetButton categoryId={category.id} />
        </div>
      </div>
    </div>
  );
}

export default Category