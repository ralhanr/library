var Library = artifacts.require("./Library.sol");


let library;
let accounts;

beforeEach( async () => {

  library = await Library.deployed();
  await contract('Library', function(acc) {
    accounts = acc;
  })

  });

describe('all tests', () => {

  it('create a Library owner', async () => {
    const owner = await library.owner();
    assert.equal(owner, accounts[0]);

  })

  it('can add a Librarian', async () => {
    await library.addLibrarian("Rachna", accounts[1], {from: accounts[0]});
    const result = await library.mapLibrarian(accounts[1]);
    assert.equal(result, true);

  })

  it('can remove a Librarian', async () => {
    await library.addLibrarian("Rachna", accounts[1], {from: accounts[0]});
    await library.addLibrarian("Yogi", accounts[2], {from: accounts[0]});
    await library.removeLibrarian(accounts[1], {from: accounts[0]});
    const result = await library.mapLibrarian(accounts[1]);
    assert.equal(result, false);

  })

  it('can add a book', async () => {
    await library.addLibrarian("Rachna", accounts[1], {from: accounts[0]});
    await library.addBook("Add Book", accounts[5], {from: accounts[1]});
    let booksList = await library.allCurrentBooks(0);
    assert.equal(booksList[0], "Add Book");
  })

  it('can remove a book', async () => {
     await library.addLibrarian("Rachna", accounts[1], {from: accounts[0]});
     await library.addBook("Remove Book", accounts[6], {from: accounts[1]});
     await library.removeBook("Remove Book", accounts[6], {from: accounts[1]});
     let booksList = await library.allCurrentBooks(0);
     console.log(booksList);
   assert.notEqual(booksList[1], 'Remove Book');

 })

  it('can show complete Book History', async () => {
    await library.addLibrarian("Rachna", accounts[1], {from: accounts[0]});
    await library.addBook("Show History", accounts[7], {from: accounts[1]});
    const history = await library.trackBookHistory("Show History");
    assert.equal(history, accounts[7]);
    assert.equal(history.length, 1);
  })

  it('can check in a book and change book history', async () => {
    await library.addLibrarian("Rachna", accounts[1], {from: accounts[0]});
    await library.addBook("Check In Book", accounts[8], {from: accounts[1]});
    await library.checkOutBook("Check In Book", accounts[9], {from: accounts[1]});
    await library.checkInBook("Check In Book", {from: accounts[9]});
    const history = await library.trackBookHistory("Check In Book");
    assert.equal(history[1], accounts[9]);
    console.log(history);
    assert.equal(history.length, 3);
  })

  it('can check out a book and change book history', async () => {
    await library.addLibrarian("Rachna", accounts[1], {from: accounts[0]});
    await library.addBook("Check Out Book", accounts[8], {from: accounts[1]});
    await library.checkOutBook("Check Out Book", accounts[9], {from: accounts[1]});
    const history = await library.trackBookHistory("Check Out Book");
    assert.equal(history[1], accounts[9]);
    assert.equal(history.length, 2);
  })

})
