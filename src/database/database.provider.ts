import { Param, Provider } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

export const databaseProviders: Provider[] = [
  {
    provide: 'DATABASE_CLIENT',
    useFactory: async (): Promise<MongoClient> => {
      if (!process.env.DB_CONNECTION) {
        throw new Error('DB_CONNECTION is not defined');
      }
      try {
        const client = await MongoClient.connect(process.env.DB_CONNECTION, {
          ignoreUndefined: true,
        });
        console.log('Successfully connected to MongoDB.');
        return client;
      } catch (error) {
        throw error;
      }
    },
  },
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (client: MongoClient): Promise<Db> => {
      try {
        //const dbName = '!process.env.DB_NAME';
        return client.db();
      } catch (error) {
        throw error;
      }
    },
    inject: ['DATABASE_CLIENT'],
  },
];
