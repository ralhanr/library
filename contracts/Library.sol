pragma solidity ^0.4.23;
//pragma experimental ABIEncoderV2;

import "../client/node_modules/zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract Library is MintableToken{

    string public constant name = "Library Token";
    string public constant symbol = "RR";
    uint8 public constant decimals = 18;

    struct Librarian {
        string libName;
        address libAddress;
    }

    struct Book {
        string bookName;
        address bookOwner;
        bool checkedIn;
        bool exists;
    }

    struct AllCurrentBooks {
      string bookName;
      address bookOwner;
    }


    struct BookHistory {
        string name;
        address [] adr;
        bool validBook;
        bytes32 [] damageRepair;
    }


   Librarian[] public librarians;
   string [] totalBooks;
   AllCurrentBooks [] public allCurrentBooks;

   mapping(string => Book) books;
   mapping(string => BookHistory) bookHistory;
   mapping (address => bool) public mapLibrarian;

   address public owner;

    constructor () public {
        owner = msg.sender;
    }

// Add a New Librarian (Only the Owner can perform this function using librarian name and address).

    function addLibrarian (string libName, address libAddress) public {
        require(msg.sender == owner);
        Librarian memory newLibrarian = Librarian({
           libName: libName,
           libAddress: libAddress
        });

        librarians.push(newLibrarian);
        mapLibrarian[libAddress] = true;
    }

//  Remove a Librarian (Only the Owner can perform this function using librarian address).

    function removeLibrarian(address libAddress) public {
        require(msg.sender == owner);
        require(mapLibrarian[libAddress] == true);
        mapLibrarian[libAddress] = false;
        for(uint i=0; i<librarians.length; i++) {
            if(librarians[i].libAddress == libAddress) {
                librarians[i] = librarians[librarians.length-1];
                delete librarians[librarians.length-1];
                librarians.length--;
            }
        }
    }


//  Add a New Book (Only a librarian can perform this function using book name and book address).

    function addBook(string bookName, address bookOwner) public {
        require(mapLibrarian[msg.sender] == true);
        require(bookHistory[bookName].validBook == false);
        Book memory newBook = Book({
            bookName: bookName,
            bookOwner: bookOwner,
            checkedIn: true,
            exists: true
        });
        AllCurrentBooks memory bookN = AllCurrentBooks({
          bookName: bookName,
          bookOwner: bookOwner
          });
        books[bookName] = newBook;
        bookHistory[bookName].name = bookName;
        bookHistory[bookName].adr.push(bookOwner);
        bookHistory[bookName].validBook = true;
        books[bookName].exists = false;
        totalBooks.push(bookName);
        allCurrentBooks.push(bookN);
    }


//  Remove a Book (Only a librarian can perform this function using book name and book address).

    function removeBook(string bookName, address bookOwner) public {
         require(mapLibrarian[msg.sender] == true);
         require(bookHistory[bookName].validBook == true);
         require(books[bookName].checkedIn == true);
          books[bookName].checkedIn = false;
          bookHistory[bookName].validBook = false;
          books[bookName].exists = false;
         for(uint i=0; i<allCurrentBooks.length; i++) {
              if(allCurrentBooks[i].bookOwner == bookOwner) {
                  allCurrentBooks[i] = allCurrentBooks[allCurrentBooks.length-1];
                  delete allCurrentBooks[allCurrentBooks.length-1];
                  allCurrentBooks.length--;
                  totalBooks.length--;
              }
          }
      }

//  Get total number of books in the Library.

    function showTotalBooks() public view returns (uint) {
      return totalBooks.length;
   }

//  Check out a book (Only the librarian can perform this function using a checkout address,
//  provided the book is valid and has been chcked in before).

    function checkInBook(string bookName) public {
        require(bookHistory[bookName].validBook == true);
        require(books[bookName].checkedIn == false);
        uint length = bookHistory[bookName].adr.length;
        require(bookHistory[bookName].adr[length - 1] == msg.sender);
        bookHistory[bookName].adr.push(msg.sender);
        books[bookName].checkedIn = true;
    }

//  Check in a book (anyone can check in a book, provided that book was checked out to that address previously).

    function checkOutBook(string bookName, address checkOutAddress) public {
        require(mapLibrarian[msg.sender] == true);
        require(bookHistory[bookName].validBook == true);
        require(books[bookName].checkedIn == true);
        bookHistory[bookName].adr.push(checkOutAddress);
        books[bookName].checkedIn = false;

    }

//  Trade a Book with another book (Only the book owner can do this using new owner's address).

    function tradeBook(string tradeInBook, string tradeWithBook, address newOwner) public {
        require(books[tradeInBook].bookOwner == msg.sender);
        require(books[tradeInBook].checkedIn == true);
        require(books[tradeWithBook].checkedIn == true);
        books[tradeInBook].bookOwner = newOwner;
        books[tradeWithBook].bookOwner = msg.sender;
        bookHistory[tradeInBook].name = tradeInBook;
        bookHistory[tradeInBook].adr.push(newOwner);
        bookHistory[tradeInBook].validBook = true;
        bookHistory[tradeWithBook].name = tradeInBook;
        bookHistory[tradeWithBook].adr.push(msg.sender);
        bookHistory[tradeInBook].validBook = true;
    }

//   Add Damage/Repair History to an existing book. (Only librarian can do this).

     function addDamageRepairHistory (string bookName, bytes32 data) public {
        require(mapLibrarian[msg.sender] == true);
        bookHistory[bookName].damageRepair.push(data);
    }

//  Check Damage/Repair History for an existing book (Anyone can do this using the book name).

    function showDamageRepairHistory (string bookName) public view returns (bytes32 []) {
        require(mapLibrarian[msg.sender] == true);
        return bookHistory[bookName].damageRepair;
    }


//  Show Book History (shows original owner, check in and check out hisory.
//  Anyone can do this using a valid existing book's name).

    function trackBookHistory(string bookName) public view returns (address []) {

        require(bookHistory[bookName].validBook == true);
        return bookHistory[bookName].adr;

    }

}
