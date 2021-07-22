import _ from 'lodash';
import { authorTbl, bookTbl } from './schema_data';

class Author {
  constructor({ id, firstName, lastName, email, age, gender, isBestSeller, hobby }) {
    if (id) {
      this.id = id;
    }
    if (firstName) {
      this.firstName = firstName;
    }
    if (lastName) {
      this.lastName = lastName;
    }
    if (email) {
      this.email = email;
    }
    if (age) {
      this.age = age;
    }
    if (gender) {
      this.gender = gender;
    }
    if (isBestSeller) {
      this.isBestSeller = isBestSeller;
    }
    if (hobby) {
      this.hobby = hobby;
    }
  }

  updateAuthor () {
    if (this.id) {
      const index = _.findIndex(authorTbl, { id: this.id });
      if (index !== -1) {
        const prevRow = _.find(authorTbl, { 'id': this.id });
        const updatedRow = { ...prevRow, ...this }
        authorTbl.splice(index, 1, updatedRow);
        return authorTbl[index];
      }
      else {
        return { id: 404, reason: `No such author exist for ${this.id}` };
      }
    }
    else {
      return { id: 404, reason: `No id exist in request` };
    }
  }
}

class Book {
  constructor({ id, name, price, aid }) {
    if (id) {
      this.id = id;
    }
    if (name) {
      this.name = name;
    }
    if (price) {
      this.price = price;
    }
    if (aid) {
      this.aid = aid.substring(1);
    }
  }
  updateBook () {
    if (this.id) {
      const index = _.findIndex(bookTbl, { id: this.id });
      if (index !== -1) {
        const prevRow = _.find(bookTbl, { 'id': this.id });
        const updatedRow = { ...prevRow, ...this }
        bookTbl.splice(index, 1, updatedRow);
        return bookTbl[index];
      }
      else {
        return { id: 404, reason: `No such book exist for ${this.id}` };
      }
    }
    else {
      return { id: 404, reason: `No id exist in request` };
    }
  }
}

// resolver for Query, Mutation & other objects.
export const resolvers = {
  Query: {
    getAuthor: (parent, { id }) => {
      return _.find(authorTbl, { 'id': id });
    },
    getAllAuthors: () => authorTbl,
    getBook: (parent, { id }) => {
      return _.find(bookTbl, { 'id': id });
    },
    getAllBooks: () => bookTbl,
  },
  Book: {
    author: author => _.find(authorTbl, { id: author.aid })
  },
  Author: {
    books: author => _.filter(bookTbl, { aid: author.id }),
    isBestSeller: author => (author.isBestSeller == 'Yes')
  },
  Mutation: {
    createAuthor: (parent, { input }) => {
      let id = require('crypto').randomBytes(10).toString('hex');
      input.id = id;
      let author = new Author(input);
      authorTbl.push(author);
      return author;
    },
    updateAuthor: (parent, { input }) => {
      const author = new Author(input);
      return author.updateAuthor();
    },
    deleteAuthor: (parent, { id }) => {
      if (_.findIndex(authorTbl, { id: id }) !== -1) {
        _.remove(authorTbl, { id: id })
        return `Successfully deleted author ${id}`;
      }
      else {
        return `No such author exist for ${id}`;
      }
    },
    createBook: (parent, { input }) => {
      let id = require('crypto').randomBytes(10).toString('hex');
      input.id = id;
      let book = new Book(input);
      bookTbl.push(book);
      return book;
    },
    updateBook: (parent, { input }) => {
      const book = new Book(input);
      return book.updateBook();
    },
    deleteBook: (parent, { id }) => {
      if (_.findIndex(bookTbl, { id: id }) !== -1) {
        _.remove(bookTbl, { id: id })
        return `Successfully deleted book ${id}`;
      }
      else {
        return `No such book exist for ${id}`;
      }
    },
  },
  UpdateReturn: {
    __resolveType: obj => {
      if (obj.age) {
        return "Author"
      }
      if (obj.price) {
        return "Book"
      }
      if (obj.reason) {
        return "Error"
      }
    }
  },
  Node: {
    __resolveType: obj => {
      if (obj.age) {
        return "Author"
      }
      if (obj.price) {
        return "Book"
      }
      if (obj.reason) {
        return "Error"
      }
    }
  }
};
