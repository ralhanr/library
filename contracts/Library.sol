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


    function addLibrarian (string libName, address libAddress) public {
        require(msg.sender == owner);
        Librarian memory newLibrarian = Librarian({
           libName: libName,
           libAddress: libAddress
        });

        librarians.push(newLibrarian);
        mapLibrarian[libAddress] = true;
    }

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

  function showTotalBooks() public view returns (uint) {
      return totalBooks.length;
   }

    function checkInBook(string bookName) public {
        require(bookHistory[bookName].validBook == true);
        require(books[bookName].checkedIn == false);
        uint length = bookHistory[bookName].adr.length;
        require(bookHistory[bookName].adr[length - 1] == msg.sender);
        bookHistory[bookName].adr.push(msg.sender);
        books[bookName].checkedIn = true;
    }

    function checkOutBook(string bookName, address checkOutAddress) public {
        require(mapLibrarian[msg.sender] == true);
        require(bookHistory[bookName].validBook == true);
        require(books[bookName].checkedIn == true);
        bookHistory[bookName].adr.push(checkOutAddress);
        books[bookName].checkedIn = false;

    }

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

     function addDamageRepairHistory (string bookName, bytes32 data) public {
        require(mapLibrarian[msg.sender] == true);
        bookHistory[bookName].damageRepair.push(data);
    }

    function showDamageRepairHistory (string bookName) public view returns (bytes32 []) {
        require(mapLibrarian[msg.sender] == true);
        return bookHistory[bookName].damageRepair;
    }

    function trackBookHistory(string bookName) public view returns (address []) {

        require(bookHistory[bookName].validBook == true);
        return bookHistory[bookName].adr;

    }

}
