/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { db } from '../../firebase'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore'

import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import Moment from 'react-moment'

function Post({ id, name, img, caption, userImg }) {
  const [showMore, setShowMore] = useState(false)
  const [showState, setShowState] = useState(false)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)
  const { data: session } = useSession()

  // Show more functionality
  useEffect(() => {
    setShowState(true)
    if (caption.length > 100) {
      setShowMore(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Comment use effect
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setComments(snapshot.docs)
        }
      ),
    [id]
  )

  // Get the likes
  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
        setLikes(snapshot.docs)
      }),
    [id]
  )

  // Check the state if we had liked it before
  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes])

  // Send comment
  const sendComment = async (e) => {
    e.preventDefault()

    await addDoc(collection(db, 'posts', id, 'comments'), {
      username: session.user.username,
      profileImg: session.user.image,
      comment: comment,
      timestamp: serverTimestamp(),
    })

    setComment('')
  }

  const sendLike = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username,
      })
    }
  }

  return (
    <div className="bg-gray-50 my-4 border border-gray-300 rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5">
        <img className="w-12 h-12 object-cover rounded-full cursor-pointer" src={userImg} alt="" />
        <p className="font-bold text-md ml-4 flex-1">{name}</p>
        <DotsHorizontalIcon className="h-5 text-gray-500" />
      </div>

      {/* Image */}
      <img className="w-full object-cover" src={img} alt="" />

      {/* Buttons */}
      {session && (
        <div className="flex items-center justify-between px-4 pt-2">
          <div className="flex items-center gap-x-4">
            {!hasLiked ? (
              <HeartIcon className="btn" onClick={sendLike} />
            ) : (
              <HeartIconFilled className="btn text-red-500" onClick={sendLike} />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>

          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* Caption */}
      <div className="flex flex-col gap-y-4 px-4 py-4">
        {likes.length > 0 && (
          <p className="text-md font-semibold pt-2">
            {likes.length} {likes.length === 1 ? 'like' : 'likes'}
          </p>
        )}
        {showState && (
          <p className="flex gap-x-4">
            <span className="font-bold text-md">{name}</span>{' '}
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
          </p>
        )}
      </div>

      {/* Comments */}
      <h2 className="text-md md:text-md my-2 font-semibold px-4">
        {comments.length > 0 ? 'Comments' : 'No comments. Be the first to drop a comment!!'}
      </h2>
      {comments.length > 0 && (
        <div className="h-20 w-full flex flex-col gap-y-3 p-3 px-4 overflow-y-scroll">
          {comments.map((comment) => (
            <div className="flex justify-between gap-x-4" key={comment.id}>
              <div className="flex gap-x-4">
                <img
                  className="h-7 w-7 object-cover rounded-full"
                  src={comment.data().profileImg}
                  alt=""
                />
                <p className="flex flex-col gap-y-2 md:gap-y-4">
                  <span className="text-md font-semibold">{comment.data().username}</span>
                  {comment.data().comment}
                </p>
              </div>
              <Moment className='text-sm text-gray-500 md:text-md' fromNow>{comment.data().timestamp?.toDate()}</Moment>
            </div>
          ))}
        </div>
      )}

      {/* Input box */}
      {session && (
        <form className="flex items-center p-4 gap-x-4" onSubmit={sendComment}>
          <EmojiHappyIcon className="btn" />
          <input
            className="bg-transparent outline-none flex-1"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            className="outline-none border-none text-blue-400 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-300"
            onClick={sendComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}

export default Post
