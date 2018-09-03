# library DAPP

Step 1
GitClone from https://github.com/ralhanr/library.git
This will install in directory 'library'

Step 2
npm install -g truffle (Only required if not already installed)

Open console window in library directory from step 1
execute truffle develop (to run etherium private network)

Step 3
Goto library directory from step 1
Goto to directory /client
execute npm install
execute truffle compile
execute truffle migrate
execute npm run dev
// This will create your localhost for front end application

Step 4
browse to localhost from step 3

Step 5
Connect to locally created ethereum network using metamask
goto settings and paste address: http://127.0.0.1:9545

Step 6
From truffle develop window (from step 2)
import 1st accounts key using import account in metamask

Front end application should now be up and running.  
The following functions have been implemented:
1. Get library owner
2. Add new librarian
3. Add new book
4. Get total books in library
