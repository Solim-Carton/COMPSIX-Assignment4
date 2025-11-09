const request = require('supertest');
const app = require('../server'); // Import your Express app

describe('Books API', () => {
    // Write tests here
    test('should return all books', async () => {
    const response = await request(app).get('/api/books');

    expect(response.status).toBe(200);

    expect(response.body).toHaveLength(3); // Assuming 3 books in your data 

});
// Test Id
test('GET /api/books/:id should return a book', async () => {
    const response = await request(app).get('/api/books/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });
  //Posting New Book
   test('POST /api/books creates a new book', async () => {
    const newBook = {
      title: 'New Book',
      author: 'New Author',
      genre: 'Fiction',
      copiesAvailable: 10
    };
    const response = await request(app).post('/api/books').send(newBook);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('New Book');

});

test('DELETE /api/books/:id removes a book', async () => {
    const response = await request(app).delete('/api/books/1');
    expect(response.status).toBe(204);

    const allBooks = await request(app).get('/api/books');
    expect(allBooks.body).toHaveLength(3); // removed 1, added 1 from POST earlier
    expect(allBooks.body.find(b => b.id === 1)).toBeUndefined();
  });


});





