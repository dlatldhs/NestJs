import { PipeTransform , ArgumentMetadata , BadRequestException } from "@nestjs/common";
import { BoardStatus } from "../board.model";
export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]
    transform(value: any) {
        value = value.toUpperCase(); // 소문자 -> 대문자

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the status options`);
        }

        return value;
    }
    
    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status); // status 의 해당한 값의 index return
        return index !== -1;
    }
}