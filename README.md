# library DAPP

STEP 1

Git clone https://github.com/ralhanr/library.git

This will create a directory 'library'.

STEP 2

NPM INSTALL -G TRUFFLE (Only required if Truffle not already installed)

STEP 3

Inside the 'library' directory, go to 'client' directory.

STEP 4:

1) Open 2 Terminal/Console windows.
2) The first terminal window will be used to run the Ethereum node by Truffle and the second window will be used to run the front end of the DAPP application.

STEP 5:

1) In one of the windows, run 'TRUFFLE DEVELOP'   (This will start your local network at http://127.0.0.1:9545)
2) This window will give you bunch of testing accounts on this private network.
3) We will come back later and use one of this accounts and import it into Metamask.

STEP 6

In the second terminal window, run:

1) NPM INSTALL
2) TRUFFLE COMPILE
3) TRUFFLE MIGRATE
4) TRUFFLE TEST  (10 unit tests have been written. These should all be passing).
4) NPM RUN DEV   (This will start your localhost for front end application at port 3000)

STEP 7

Go to http://localhost:3000/

STEP 8

Setting up Metamask

1) Make sure Metamask chrome extension is installed and you are logged into Metamask.
2) Now we need to connect our Metamask to our locally running Truffle Private Network.
3) Go to Metamask settings, and enter http://127.0.0.1:9545 in the 'New RPC Url' tab and hot save.
4) Now to run transactions, we need to add one of our Truffle accounts to Metamask.
5) To do this, go to 'Import Account' in Metamask and enter your first account's private key here and hit save.
6) This will add Truffle account in your Metamask account, hence we can run transactions now.

STEP 9

From truffle develop window (from step 2)

1) Import first account's key using 'Import account' in metamask
2) Front end application should now be up and running.  

STEP 10

The following functions have been implemented:

1) Get the Library Owner
2) Add a New Librarian
3) Add a New Book
4) Get Total Books in Library (This number will increase as you add more books to the library).


Notes:

1) You can also paste the Solidity code from the library.sol file in https://remix.ethereum.org and run using:

  - Javascript VM

  - Injected Web3, and connect to Rinkeby. I have deployed the contract to Rinkeby. You can load it using Contract address 0xdcF691120f17B9A0D46F8778Ad56E53C2E04831C

  - You can also connect Remix to your local Truffle running node by using 'Web3 Provider' and connect to http://localhost:9545 (This is where your private node is running from STEP 5 above).
