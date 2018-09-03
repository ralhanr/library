import React from 'react'
import Link from 'next/link'
import {Button, Form, Input, Message} from 'semantic-ui-react';
import Web3Container from '../lib/Web3Container'
import Layout from '../components/Layout';


class Dapp extends React.Component {
  state = {
    owner: undefined,
    ethBalance: undefined,
    balance: undefined,
    librarian: undefined,
    libAddress: undefined,
    errorMessage: '',
    errorMessageBook: '',
    loading_librarian: false,
    loading_book: false,
    newBook: undefined,
    bookAddress: undefined,
    totalBooks: undefined
  };

  onLibChange = (event) => {
    this.setState({librarian: event.target.value})
  }

  onAddressChange = (event) => {
    this.setState({libAddress: event.target.value})
  }

  onBookChange = (event) => {
    this.setState({newBook: event.target.value})
  }

  onBookAddressChange = (event) => {
    this.setState({bookAddress: event.target.value})
  }

  getOwner = async () => {
    const { accounts, contract } = this.props
    const response = await contract.methods.owner().call({ from: accounts[0] })
    this.setState({ owner: response })
  };

  getTotalBooks = async () => {
    const { accounts, contract } = this.props
    const response = await contract.methods.showTotalBooks().call({ from: accounts[0] })
    this.setState({ totalBooks: response })
  };

  addLibrarian = async (event) => {
    event.preventDefault();
    this.setState({loading_librarian: true, errorMessage: ''});
  try{
    const { accounts, contract } = this.props
    await contract.methods.addLibrarian(this.state.librarian, this.state.libAddress).send({ from: this.state.owner })
  }
  catch(err) {
    this.setState({errorMessage: err.message})
  }
    this.setState({loading_librarian: false});
  }

  removeLibrarian = async () => {

    const { accounts, contract } = this.props
    await contract.methods.removeLibrarian("Rachna", accountLib).send({ from: this.state.owner })

    const response = await contract.methods.mapLibrarian(accountlib);
  };


  addBook = async (event) => {
    event.preventDefault();
    this.setState({loading_book: true, errorMessageBook: ''});
  try{
    const { accounts, contract } = this.props
    await contract.methods.addBook(this.state.newBook, this.state.bookAddress).send({ from: this.state.libAddress })
  }
  catch(err) {
    this.setState({errorMessageBook: err.message})
  }
    this.setState({loading_book: false});
  }


  render () {
    const { balance = 'N/A', ethBalance = 'N/A', owner = 'N/A'} = this.state
    return (
      <div>
      <Layout>
      <div> <br /> <br />
        <Link href='/'>
          <a><h3>Back To Home</h3></a>
        </Link>
      </div>
      <br />
        <h1>{`Rachna's Library`}</h1>
        <hr />

        <h3>Get Owner of The Library</h3>
        <Form onSubmit={this.getOwner}>
      <Button primary type='submit'>Who is the Owner?</Button>
    </Form>
    <br />
      <div><h3>Library Owner: {this.state.owner}</h3></div>
    <br />
    <hr />
    <br />
        <h3>Add a New Librarian</h3>
        <Form onSubmit={this.addLibrarian} error={!!this.state.errorMessage}>
      <Form.Field>
        <label>Name of the Librarian</label>
        <Input
        labelPosition='left' label='Enter Name of the Librarian'
        value={this.state.librarian}
        onChange = {this.onLibChange}
        />
        <br />
        <br />
        <Input
        labelPosition='left' label='Librarian Address(from metamask)'
        value={this.state.libAddress}
        onChange = {this.onAddressChange}
        />
      </Form.Field>
      <Message error header='Oops..' content={this.state.errorMessage} />
      <Button loading={this.state.loading_librarian} primary type='submit'>Add a New Librarian</Button>
    </Form>
    <br />
    <hr />
    <br />
    <h3>Add a New Book(Make Sure you are using your Librarian Address to perform this function!)</h3>
    <Form onSubmit={this.addBook} error={!!this.state.errorMessageBook}>
  <Form.Field>
    <label>Name of the Book</label>
    <Input
    labelPosition='left' label="Enter New Book Title"
    value={this.state.newBook}
    onChange = {this.onBookChange}
    />
    <br />
    <br />
    <Input
    labelPosition='left' label="Book Owner Address(from metamask)"
    value={this.state.bookAddress}
    onChange = {this.onBookAddressChange}
    />
  </Form.Field>
  <Message error header='Oops..' content={this.state.errorMessageBook} />
  <Button loading={this.state.loading_book} primary type='submit'>Add a New Book</Button>
</Form>
<br />
<hr />
<br />

<h3>Get Total Books in {`Rachna's`} Library</h3>
<Form onSubmit={this.getTotalBooks}>
<Button primary type='submit'>Total Books</Button>
</Form>
<br />
<div><h3>Total Books Available: {this.state.totalBooks}</h3></div>
<br />
<hr />
<br />
        </Layout>
      </div>
    )
  }
}

export default () => (
  <Web3Container
    renderLoading={() => <div>Loading Dapp Page...</div>}
    render={({ web3, accounts, contract }) => (
      <Dapp accounts={accounts} contract={contract} web3={web3} />
    )}
  />
)
