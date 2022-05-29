import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                debug: true,
                playground: true,
                autoSchemaFile: join(process.cwd(), 'schema.gql'),
                subscriptions: {
                    'graphql-ws': true,
                    'subscriptions-transport-ws': true,
                },
                // installSubscriptionHandlers: true,
                cors: configService.get('CORS'),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class GraphQLModuleUtils { }
