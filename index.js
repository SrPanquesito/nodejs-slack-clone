import * as dotenv from 'dotenv';
dotenv.config();

import Hapi from '@hapi/hapi';
import { ApolloServer, ApolloServerPluginStopHapiServer } from 'apollo-server-hapi';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import sequelize from './sequelize';
import path from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema'
import { mergeTypeDefs, mergeResolvers } from'@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
const types = loadFilesSync(path.join(__dirname, './graphql/schemas'))
const resolvers = loadFilesSync(path.join(__dirname, './graphql/resolvers'));

const DEFAULT_PORT = 4000;

async function startApolloServer(typeDefs, resolvers) {
  const app = Hapi.server({ port: process.env.PORT || DEFAULT_PORT });

  const server = new ApolloServer({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers,
      csrfPrevention: true,
      cache: 'bounded',
      plugins: [ApolloServerPluginStopHapiServer({ hapiServer: app }), ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    })
  });

  await server.start();
  await server.applyMiddleware({ app });
  await app.start();
}

async function startDatabase() {
  await sequelize.sync();
}

/* Start */
try {
    startDatabase();
    startApolloServer(mergeTypeDefs(types), mergeResolvers(resolvers));
    console.log(`Server init on http://localhost:${process.env.PORT || DEFAULT_PORT}`);
} catch(err) {
    console.log(`FATAL ERROR: `, err);
}