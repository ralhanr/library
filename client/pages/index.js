import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout';

export default () =>
  <div>
  <Layout>
  <br />
    <h1>{`Rachna's Library Home Page...Enter Here`}</h1>

    <div><Link href='/dapp'><a>My Dapp</a></Link></div>
    </Layout>
  </div>
