import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '81425000',
    database: 'typeorm',
    entities: ["dist/**/**/*.entity{.ts, .js}"],
    synchronize: true
  }), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }