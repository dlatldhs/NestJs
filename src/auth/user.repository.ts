import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CustomRepository } from "src/typeorm/typeorm.decorator";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialDto:AuthCredentialDto): Promise<void> {
        const { username , password } = authCredentialDto;

        const salt = await bcrypt.genSalt(); // create
        const hashedPassword = await bcrypt.hash(password,salt); // combine
        const user = this.create({ username , password: hashedPassword }); // put it
        
        try {
            await this.save(user); // save
        } catch (error) {
            if ( error.code === '23505' ) {
                throw new ConflictException('Existing userna');
            }
            else {
                throw new InternalServerErrorException();
            }
        }
    }
}