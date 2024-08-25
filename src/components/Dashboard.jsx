import React from 'react'
import Category from './Category'

const Dashboard = ({data}) => {
  return (
    <div className='w-full'>
      {data.categories.map(category => (
      <Category key={category.id} category={category} />
      ))}

    </div>
  )
}

export default Dashboard