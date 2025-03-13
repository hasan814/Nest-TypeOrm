import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '81425000',
    database: 'typeorm',
    autoLoadEntities: true,
    entities: [],
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }