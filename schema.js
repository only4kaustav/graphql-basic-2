import { resolvers } from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';
import { authorTbl } from './schema_data';

const allAuthorIds = authorTbl.flatMap(author => [
  `_${author.id}`
]);

const typeDefs = `
    interface Node {
        id: ID
    }
    type Author implements Node{
        id: ID
        firstName: String
        lastName: String
        age: Int
        gender: Gender
        email: String
        isBestSeller: Boolean
        hobby: [String!]
        books: [Book]
    }

    enum Gender{
        Male
        Female
        Other
    }

    type Book implements Node {
        id: ID
        name: String
        price: Int
        author: Author
    }

    type Query {
        getAuthor(id: ID): Author
        getAllAuthors: [Author]
        getBook(id: ID): Book
        getAllBooks: [Book]
    }

    type Error implements Node {
        id: ID
        reason: String
    }

    input AuthorInput {
        id: ID
        firstName: String
        lastName: String
        age: Int
        gender: Gender
        email: String
        isBestSeller: Boolean
        hobby: [String!]
    }

    enum Aid{
        ${allAuthorIds}
    }

    input BookInput {
        id: ID
        name: String
        price: Int
        aid: Aid
    }

    union UpdateReturn = Author| Book | Error

    type Mutation {
        createAuthor(input: AuthorInput): Author
        updateAuthor(input: AuthorInput): UpdateReturn
        deleteAuthor(id: ID!): String
        createBook(input: BookInput): Book
        updateBook(input: BookInput): UpdateReturn
        deleteBook(id: ID!): String
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };
