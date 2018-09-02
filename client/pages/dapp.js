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
    bookAddress: undefined
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
    //console.log(accounts[0]);
    const response = await contract.methods.owner().call({ from: accounts[0] })
    this.setState({ owner: response })
  };

  addLibrarian = async (event) => {
    event.preventDefault();
    this.setState({loading_librarian: true, errorMessage: ''});
  try{
    const { accounts, contract } = this.props
    console.log(this.state.librarian);
    console.log(this.state.libAddress);
    console.log(this.state.owner);
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
    console.log(this.state.newBook);
    console.log(this.state.bookAddress);
    console.log(this.state.libAddress)
    await contract.methods.addBook(this.state.newBook, this.state.bookAddress).send({ from: this.state.libAddress })
  }
  catch(err) {
  this.setState({errorMessageBook: err.message})
  }
  this.setState({loading_book: false});
  }

  getEthBalance = async () => {
    const { web3, accounts } = this.props
    const balanceInWei = await web3.eth.getBalance(accounts[0])
    this.setState({ ethBalance: balanceInWei / 1e18 })
  };

  render () {
    const { balance = 'N/A', ethBalance = 'N/A', owner = 'N/A'} = this.state
    return (
      <div>
      <Layout><br /> <br />
        <h1>{`Rachna's Library`}</h1>
        <hr />

        <h3>Get Owner of The Library</h3>
        <Form onSubmit={this.getOwner}>
      <Button primary type='submit'>Who is the Owner?</Button>
    </Form>
    <br />
      <div>Library Owner: {this.state.owner}</div>
    <br />
    <hr />
    <br />
        <h3>Add a New Librarian</h3>
        <Form onSubmit={this.addLibrarian} error={!!this.state.errorMessage}>
      <Form.Field>
        <label>Name of the Librarian</label>
        <Input
        labelPosition='right'
        value={this.state.librarian}
        onChange = {this.onLibChange}
        />
        <Input
        labelPosition='right'
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
    labelPosition='right'
    value={this.state.newBook}
    onChange = {this.onBookChange}
    />
    <Input
    labelPosition='right'
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


        <div>
          <Link href='/'>
            <a>Back To Home</a>
          </Link>
        </div>
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
