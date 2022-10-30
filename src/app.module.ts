import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoDBModule } from './database/database.module';
import { TilesModule } from './tiles/tiles.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getMiddlewareJWT } from './middlewars/auth.middleware';
import { TilesController } from './tiles/tiles.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    UsersModule,
    TilesModule,
    MongoDBModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{// implements NestModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(getMiddlewareJWT)
  //     .forRoutes(TilesController);
  // }
}
