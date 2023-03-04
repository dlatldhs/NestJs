import { Controller , Body , Post , ValidationPipe, UseGuards , Req } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService){};

   @Post('/signup')
   signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void>{
      return this.authService.signUp(authCredentialDto);
   }
   
   @Post('/signin')
   signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}>{
      return this.authService.signIn(authCredentialDto);
   }

   @Post('/test')
   @UseGuards(AuthGuard()) // user 객체 포함
   test(@GetUser() user: User) {
      console.log('user', user);
   }
}
