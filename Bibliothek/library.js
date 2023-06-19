const express = require('express');
const app = express()
const port = 3000;
const bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res){
    res.send("Willkomen")
})

const books = [
    { isbn: 1, title: 'Buch 1', year: "2012", author: 'Autor 1' },
    { isbn: 2, title: 'Buch 2', year: "2012", author: 'Autor 2' },
    { isbn: 3, title: 'Buch 3', year: "2012", author: 'Autor 3' }
];

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:isbn', (req, res) => {
    const { isbn } = req.params;

    if (books.hasOwnProperty(isbn)) {
        res.json(books[isbn]);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

app.post('/books', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.json(newBook);
});

app.put('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const updatedBook = req.body;

    const bookIndex = books.findIndex(book => book.isbn === parseInt(isbn));
    
    if (bookIndex !== -1) {
        books[bookIndex] = updatedBook;
        res.json(updatedBook);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

app.delete('/books/:isbn', (req, res) => {
    const isbnToDelete = req.params.isbn;

    const bookIndex = books.findIndex(book => book.isbn === parseInt(isbnToDelete));

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(200).send("Buch erfolgreich gelöscht.");
    } else {
        res.status(404).send("Buch nicht gefunden.");
    }
});





const lends = [
    {id: 1, customer_id: 1, isbn: 1, borrowed_at: "01.09.2005 09:00", returned_at: "01.10.2005 08:30"},
    {id: 2, customer_id: 2, isbn: 2, borrowed_at: "25.10.2007 09:00", returned_at: "25.10.2008 08:30"},
    {id: 3, customer_id: 3, isbn: 3, borrowed_at: "11.10.2006 09:00", returned_at: "11.10.2007 08:30"}
];

app.get('/lends', (req, res) => {
    res.json(lends);
});

app.get('/lends/:id', (req, res) => {
    const { id } = req.params;

    if (lends.hasOwnProperty(id)) {
        res.json(lends[id]);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

app.post('/lends', (req, res) => {
    const newLend = req.body;

    // Überprüfen, ob das Buch bereits ausgeliehen ist
    const isBookAlreadyLent = lends.some((lend) => lend.isbn === newLend.isbn && lend.returned_at === null);
    if (isBookAlreadyLent) {
        res.status(422).json({ error: 'The book is already lent' });
        return;
    }

    // Check if any property is empty (except for 'returned_at')
    if (
        !newLend.id ||
        !newLend.customer_id ||
        !newLend.isbn ||
        !newLend.borrowed_at
    ) {
        res.status(422).json({ error: 'One or more properties are empty' });
        return;
    }

    let newId = 1;
    let idExists = true;

    while (idExists) {
        idExists = lends.some((lend) => lend.id === newId);
        if (idExists) {
            newId++;
        }
    }

    newLend.id = newId;
    lends.push(newLend);
    res.json(newLend);
});

app.patch('/lends/:id', (req, res) => {
    const id = req.params.id;
    const updatedLend = req.body;
    const lendIndex = lends.findIndex(lend => lend.id === parseInt(id));
    console.log(id)
    if (lendIndex !== -1) {
        lends[lendIndex] = updatedLend;
        res.json(updatedLend);
    } else {
        res.status(404).json({ error: 'Lend not found' });
    }
});


app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
});