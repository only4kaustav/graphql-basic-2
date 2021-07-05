import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema';

const app = express();
const port = 4000;

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

app.listen(port, () => {
  console.log(`now listening for requests on port ${port}`);
});
