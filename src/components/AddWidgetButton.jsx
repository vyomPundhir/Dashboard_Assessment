import React, { useState } from 'react'
import AddWidgetForm from './AddWidgetForm'

const AddWidgetButton = ({categoryId}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-[#1f68dc]">
        + Add Widget
      </button>
      {isOpen && <AddWidgetForm categoryId={categoryId} closeForm={() => setIsOpen(false)} />}
    </>
  )
}

export default AddWidgetButton