import { Module } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/typeorm/typeorm.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  // imports: [TypeOrmModule.forFeature([BoardRepository])],
  imports: [TypeOrmExModule.forCustomRepository([BoardRepository]),AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
