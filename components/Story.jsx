/* eslint-disable @next/next/no-img-element */
import React from 'react'

function Story({ name, avatar }) {
  return (
    <div className='hover:scale-110 ease-in-out duration-150 cursor-pointer select-none'>
      <img
        className="w-14 h-14 object-cover rounded-full p-[2px] border border-red-500"
        src={avatar}
        alt={name}
      />
      <p className="w-14 truncate text-xs text-gray-500 text-center font-bold mt-1">{name}</p>
    </div>
  )
}

export default Story
