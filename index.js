import * as dotenv from 'dotenv';
dotenv.config();

import Hapi from '@hapi/hapi';
import { ApolloServer, ApolloServerPluginStopHapiServer } from 'apollo-server-hapi';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import typeDefs from './schemas';
import resolvers from './resolvers';
import sequelize from './sequelize';

const DEFAULT_PORT = 4000;

async function startApolloServer(typeDefs, resolvers) {
  const app = Hapi.server({ port: process.env.PORT || DEFAULT_PORT });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginStopHapiServer({ hapiServer: app }), ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  await server.start();
  await server.applyMiddleware({ app });
  await app.start();
}

async function startDatabase() {
  await sequelize.sync({ force: true });
}

/* Start */
try {
    startDatabase();
    console.log(`Database sync`);
    startApolloServer(typeDefs, resolvers);
    console.log(`Server init on http://localhost:${process.env.PORT || DEFAULT_PORT}`);
} catch(err) {
    console.log(`ERROR: Fatal error. Sequelize / Apollo Server couldn't init.`);
}