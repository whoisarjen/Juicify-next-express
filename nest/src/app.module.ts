import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import config from './config/common.config';
import { GraphQLModuleUtils } from './utils/GraphQLModule.utils';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
            load: [config],
        }),
        GraphQLModuleUtils,
        MongooseModule.forRoot(process.env.MONGODB_STRING),
        ProductsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
