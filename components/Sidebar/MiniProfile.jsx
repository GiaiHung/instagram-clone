/* eslint-disable @next/next/no-img-element */
import React from 'react'

function MiniProfile() {
  return (
    <div className="flex items-center justify-between mt-8 ml-10">
      <div className="flex gap-x-3 items-center">
        <img
          className="w-14 h-14 object-cover rounded-full p-[2px] border border-red-500"
          src="https://links.papareact.com/3ke"
          alt=""
        />

        <div className="flex flex-col">
          <h2 className="font-medium text-lg">Giai Hung</h2>
          <p className="text-gray-500 text-md">Welcome to instagram</p>
        </div>
      </div>

      <button className="text-red-500 hover:font-bold">Sign out</button>
    </div>
  )
}

export default MiniProfile
