import { Controller , Body , Post , ValidationPipe } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){};

    @Post('/signup')
     signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void>{
        return this.authService.signUp(authCredentialDto);
     }
}
