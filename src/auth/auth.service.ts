import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from "bcryptjs"; 
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.userRepository.createUser(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
        const { username , password } = authCredentialDto;
        const user = await this.userRepository.findOneBy({username});
        
        if ( user && ( await bcrypt.compare(password,user.password))) {
            return 'login suceess';
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}
