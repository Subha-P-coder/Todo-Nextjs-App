import React from 'react'

const Navbar = () => {
  return (
    <div className=' bg-gray-900 text-white flex py-3 flex-wrap justify-around'>
        <h1 className='text-3xl font-semibold text-orange-500'>Todo App</h1>
        <ul className='flex gap-[40px] text-m'>
          <li className='hover:bg-gray-500 p-2 rounded-lg'>Home</li>
          <li className='hover:bg-gray-500 p-2 rounded-lg'>About</li>
          <li className='hover:bg-gray-500 p-2 rounded-lg'>Products</li>
          <li className='hover:bg-gray-500 p-2 rounded-lg'>Contact</li>
        </ul>

    </div>
  )
}

export default Navbar