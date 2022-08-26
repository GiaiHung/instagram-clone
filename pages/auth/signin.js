import React from 'react'
import Head from 'next/head'
import Header from '../../components/Header/Header'

function signIn() {
  return (
    <>
      <Head>
        <title>Sign in</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
    </>
  )
}

export default signIn
