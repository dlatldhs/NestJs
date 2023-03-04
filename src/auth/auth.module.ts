import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmExModule } from 'src/typeorm/typeorm.module';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository]),
    JwtModule.register({
      secret: 'tlzmflt111',
      signOptions:{
        expiresIn: 60 * 60,
      }
    }),
    PassportModule.register({ defaultStrategy:'jwt'})],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
