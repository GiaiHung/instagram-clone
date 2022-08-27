/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'

import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'

function Post({ name, img, caption }) {
  const [showMore, setShowMore] = useState(false)
  const [showState, setShowState] = useState(false)

  useEffect(() => {
    if (caption.length > 100) {
      setShowMore(true)
    }
    setShowState(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="bg-gray-50 my-4 border border-gray-300 rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          className="w-12 h-12 object-cover rounded-full cursor-pointer"
          src="https://www.pictureframesexpress.co.uk/blog/wp-content/uploads/2020/05/7-Tips-to-Finding-Art-Inspiration-Header-1024x649.jpg"
          alt=""
        />
        <p className="font-bold text-md ml-4 flex-1">{name}</p>
        <DotsHorizontalIcon className="h-5 text-gray-500" />
      </div>

      {/* Image */}
      <img className="w-full object-cover" src={img} alt="" />

      {/* Buttons */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-x-4">
          <HeartIcon className="btn" />
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>

        <BookmarkIcon className="btn" />
      </div>

      {/* Caption */}
      <div className="flex flex-col gap-y-4 px-4 pt-4">
        <p className="font-bold text-sm">111,110 likes</p>
        {showState && <p className="flex gap-x-4">
          <span className="font-bold text-sm">{name}</span>{' '}
          <div>
            {showMore ? `${caption.substring(0, 100)}...` : caption}
            {caption.length > 100 && (
              <>
                {showMore ? (
                  <button className="show-more-btn" onClick={() => setShowMore(false)}>
                    Show more
                  </button>
                ) : (
                  <button className="show-more-btn" onClick={() => setShowMore(true)}>
                    Show less
                  </button>
                )}
              </>
            )}
          </div>
        </p>}
      </div>

      {/* Input box */}
      <form className="flex items-center p-4 gap-x-4">
        <EmojiHappyIcon className="btn" />
        <input className="bg-transparent outline-none flex-1" type="text" placeholder="Add a comment..." />
        <button className="outline-none border-none text-blue-400 cursor-pointer">Post</button>
      </form>
    </div>
  )
}

export default Post
