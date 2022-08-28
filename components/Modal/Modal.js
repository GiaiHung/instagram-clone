/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalAtom } from '../../atoms/modalAtom'
import { CameraIcon } from '@heroicons/react/outline'

import { Dialog, Transition } from '@headlessui/react'

import { db, storage } from '../../firebase'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'

function Modal() {
  const [openModal, setOpenModal] = useRecoilState(modalAtom)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const filePickerRef = useRef(null)
  const captionRef = useRef(null)

  const { data: session } = useSession()

  const addImageToPost = (e) => {
    const reader = new FileReader()

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  const uploadPost = async () => {
    if (loading) return

    setLoading(true)

    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    })

    const imageRef = ref(storage, `posts/${docRef.id}/image`)

    await uploadString(imageRef, selectedFile, 'data_url')
      .then(async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef)
        console.log(downloadURL);

        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        })
      })
      .catch((error) => alert(error))

    setSelectedFile(null)
    setOpenModal(false)
    setLoading(false)
  }

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpenModal}>
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* Trick the browser to center the modal */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-4 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-4 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              {/* Select files button */}
              {selectedFile ? (
                <img
                  className="w-full object-cover"
                  src={selectedFile}
                  alt=""
                  onClick={() => setSelectedFile(null)}
                />
              ) : (
                <div
                  className="flex items-center justify-center bg-red-100 w-12 h-12 rounded-full cursor-pointer mx-auto"
                  onClick={() => filePickerRef.current.click()}
                >
                  <CameraIcon className="text-red-700 w-6 h-6" aria-hidden="true" />
                </div>
              )}

              <div className="text-center mt-3">
                {/* Title */}
                <Dialog.Title
                  as="h3"
                  className="my-6 font-semibold text-lg text-gray-500 leading-6"
                >
                  Upload a photo
                </Dialog.Title>

                {/* Upload input */}
                <div>
                  <input
                    ref={filePickerRef}
                    hidden
                    type="file"
                    className=""
                    onChange={addImageToPost}
                  />
                </div>

                <div className="mt-2">
                  <input
                    className="w-full border-none outline-none p-2"
                    type="text"
                    placeholder="Please enter a caption"
                    ref={captionRef}
                  />
                </div>
              </div>

              {/* Upload button */}
              <div className="mt-5">
                <button
                  type="button"
                  disabled={!selectedFile}
                  className="px-4 py-2 inline-flex justify-center w-full rounded-md text-white bg-red-500 shadow-sm outline-none hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                  onClick={uploadPost}
                >
                  {loading ? 'Loading...' : 'Upload Post'}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
