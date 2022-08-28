/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useSession, signOut } from 'next-auth/react'

function MiniProfile() {
  const { data: session } = useSession()
  return (
    <div className="hidden md:flex items-center justify-between mt-8 ml-10">
      <div className="flex gap-x-3 items-center">
        <img
          className="w-14 h-14 object-cover rounded-full p-[2px] border border-red-500"
          src={session?.user?.image}
          alt=""
        />

        <div className="flex flex-col">
          <h2 className="font-medium text-lg">{session?.user?.username}</h2>
          <p className="text-gray-500 text-md">Welcome to instagram</p>
        </div>
      </div>

      <button className="text-red-500 hover:font-bold" onClick={() => signOut()}>Sign out</button>
    </div>
  )
}

export default MiniProfile
