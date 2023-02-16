// typeorm.config.ts

import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Board } from "src/boards/board.entity";
import { BoardsModule } from "src/boards/boards.module";
export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'P@ssw0rd',
    database: 'board-app',
    entities: [__dirname + '/../**/*.entity.{js,ts}',Board],
    synchronize: true
}