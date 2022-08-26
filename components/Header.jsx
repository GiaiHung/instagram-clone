/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'

import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'

function Header() {
  return (
    <div className="sticky top-0 px-4 py-2 bg-white shadow-md md:px-12">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Left */}
        <div className="hidden relative w-28 h-12 md:inline-grid">
          <Image
            priority
            src="https://links.papareact.com/ocw"
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="relative md:hidden w-12 h-12 flex-shrink-0">
          <Image
            priority
            src="https://links.papareact.com/jjm"
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Middle */}
        <div className="hidden text-gray-500 bg-gray-100 rounded-lg md:flex items-center gap-x-4 px-3 py-2">
          <div>
            <SearchIcon className="h-5 w-5 cursor-pointer" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none"
          />
        </div>

        {/* Right */}
        <div className="flex items-center justify-end gap-x-4">
          <HomeIcon className="navBtn" />
          <MenuIcon className="h-7 md:hidden cursor-pointer" />

          <div className="hidden md:block relative group">
            <PaperAirplaneIcon className="navBtn rotate-45 origin-center" />
            <div className="hidden bg-red-500 w-4 h-4 absolute -top-1 -right-2 text-xs text-white rounded-full animate-pulse md:grid place-items-center group-hover:scale-125 ease-in duration-150">
              3
            </div>
          </div>
          <PlusCircleIcon className="navBtn inline-flex" />
          <UserGroupIcon className="navBtn" />
          <HeartIcon className="navBtn" />
          <img
            className="w-10 h-10 object-cover rounded-full cursor-pointer"
            src="https://www.pictureframesexpress.co.uk/blog/wp-content/uploads/2020/05/7-Tips-to-Finding-Art-Inspiration-Header-1024x649.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}

export default Header
