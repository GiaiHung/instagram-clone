/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Head from 'next/head'
import Header from '../../components/Header/Header'

import { getProviders, signIn as Login } from 'next-auth/react'

function signIn({ providers }) {
  return (
    <>
      <Head>
        <title>Sign in</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="h-full grid place-items-center">
        <div className='flex flex-col gap-y-3 mt-20 items-center'>
          <img className="w-80" src="https://links.papareact.com/ocw" alt="" />
          <p className='text-sm italic'>This is not a REAL app, {`it's`} built with educational purpose only</p>
        </div>

        <div className="mt-20">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="bg-blue-500 text-white px-8 py-4 rounded-full hover:bg-blue-600"
                onClick={() => Login(provider.id, {callbackUrl: '/'})}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

export default signIn
