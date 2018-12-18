import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';

import db from './models'
import schema from './graphql/schema';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
  }

  private middleware(): void {
    this.express.use('/graphql',
      (req, res, next) => {
        req['context'] = {};
        req['context'].db = db;
        next();
      },
      graphqlHTTP(req => ({
        schema,
        graphiql: true, //process.env.NODE_ENV.trim() === 'development' não funcionou no windows
        context: req['context']
      }))
    );
  }
}

export default new App().express;
