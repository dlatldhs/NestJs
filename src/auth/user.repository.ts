import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CustomRepository } from "src/typeorm/typeorm.decorator";
import { AuthCredentialDto } from "./auth-credential.dto";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialDto:AuthCredentialDto): Promise<void> {
        const { username , password } = authCredentialDto;
        const user = this.create({ username , password });
        await this.save(user);
    }
}