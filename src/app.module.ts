import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './config/typeorm.config';

@Module({
  imports: [BoardsModule,TypeOrmModule.forRoot(typeORMConfig)],
})
export class AppModule {}
