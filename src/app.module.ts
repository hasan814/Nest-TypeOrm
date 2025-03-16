import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '81425000',
      database: process.env.DB_NAME || 'typeorm',
      entities: ["dist/**/**/*.entity{.ts,.js}"],
      synchronize: true
    }),
    UserModule,
    BlogModule],
  controllers: [],
  providers: [],
})
export class AppModule { }