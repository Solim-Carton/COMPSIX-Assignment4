const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", copiesAvailable: 5 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", copiesAvailable: 3 },
    { id: 3, title: "1984", author: "George Orwell", genre: "Dystopian Fiction", copiesAvailable: 7 }
];

app.get('/', (req, res) => res.send('Books API is running!'));
app.get('/api/books', (req, res) => res.json(books));
app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    res.json(book || {});
});
app.post('/api/books', (req, res) => {
    const book = { id: books.length + 1, ...req.body };
    books.push(book);
    res.status(201).json(book);
});
app.put('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (book) Object.assign(book, req.body);
    res.json(book || {});
});
app.delete('/api/books/:id', (req, res) => {
    books = books.filter(b => b.id != req.params.id);
    res.status(204).send();
});

// ✅ Only start server when run directly
if (require.main === module) {
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}

// ✅ Export app for testing
module.exports = app;
