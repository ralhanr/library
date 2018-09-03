import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout';

export default () =>
  <div>
  <Layout>
  <br />
    <h1>{`Rachna's Library Home Page`}</h1>
    <hr />
    <br />

    <div><h2><Link href='/dapp'><a>Enter Library Dapp</a></Link></h2></div>
    </Layout>
  </div>
