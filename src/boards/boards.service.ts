import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) {}

    async getAllBoards(user:User): Promise <Board[]> { // 모두니까 [] 형태
        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', { userId: user.id });

        const boards = await query.getMany();

        return boards
    }

    async createBoard(createBoardDto: CreateBoardDto , user:User): Promise <Board> {
        const {title,description} = createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        })

        await this.boardRepository.save(board); // db 에 저장
        return board;
    }

    // createBoard(createBoardDto: CreateBoardDto) {
    //     const {title , description } = createBoardDto
    //     const board: Board = {
    //         id : uuid(),
    //         title: title,
    //         description: description,
    //         status: BoardStatus.PUBLIC,
    //     }
        
    //     this.boards.push(board);
    //     return board;
    // }
    
    async getBoardById(id: number | any ): Promise <Board> {
        const found = await this.boardRepository.findOneBy({id}); // error 

        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        
        return found;
    }
    // getBoardId(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id );

    //     if (!found) {
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //     }
    //     return found;
    // }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        if(result.affected === 0) { // 0 이면 없고 1이면 있는거
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }

    // deleteBoard(id: string): void {
    //     const found = this.getBoardId(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id); 
    // }

    async updateBoardStatus(id: number , status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardId(id);
    //     board.status = status;
    //     return board;
    // }
}
