import { Body, Controller, Delete, Get, Param, Post , Patch, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardsService: BoardsService) { }

    @Get('/')
    getAllBoard(@GetUser() user:User): Promise<Board[]> {
        return this.boardsService.getAllBoards(user);
    }
   
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto: CreateBoardDto,
    @GetUser() user:User): Promise<Board> {
        return this.boardsService.createBoard(CreateBoardDto,user);
    }

    @Get('/:id')
    getBoardById(@Param('id') id:number) : Promise<Board> {
        return this.boardsService.getBoardById(id);
    }
    
    @Delete('/:id')
    deleteBoard(
        @Param('id',ParseIntPipe) id: number,
        @GetUser() user:User
    ): Promise<void> {
        return this.boardsService.deleteBoard(id,user);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ) {
        return this.boardsService.updateBoardStatus(id,status);
    }

}
