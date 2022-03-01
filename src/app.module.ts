import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './auth/auth.module';
import { BlacklistModule } from './app/blacklist/blacklist.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      //synchronize should be true only in development
      synchronize: true,
    } as TypeOrmModuleOptions),
    UsersModule,
    AuthModule,
    BlacklistModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
