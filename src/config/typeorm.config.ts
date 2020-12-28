import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1011',
  database: 'taskmanager',
  entities: [__dirname + '/../**/*.entity.{js,ts}'], //only ts throw error because run convert js
  synchronize: true,
};
