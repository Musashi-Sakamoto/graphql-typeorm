import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express'
import Express from 'express';
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from 'connect-redis';
import { redis } from './redis'
import cors from 'cors'
import { createSchema } from "./utils/createSchema";
import queryComplexity, { fieldExtensionsEstimator, simpleEstimator } from 'graphql-query-complexity'

const main = async () => {
  await createConnection();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    validationRules: [
      queryComplexity({
        maximumComplexity: 8,
        variables: {},
        onComplete: (complexity: number) => {
          console.log("Query Complexity: ", complexity)
        },
        estimators: [
          fieldExtensionsEstimator(),
          simpleEstimator({
            defaultComplexity: 1
          })
        ]
      })
    ]
  });

  const app = Express();

  const RedisStore = connectRedis(session);

  app.use(cors({
    credentials: true,
    origin: 'http:://localhost:3000'
  }))

  app.use(
    session({
      store: new RedisStore({
        client: redis
      }),
      name: 'qid',
      secret: 'aslkdfjoiq12312',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365
      }
    })
  )

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql")
  })
}

main();