import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto'; // Create this DTO
import { Public } from '../common/decorators/public.decorator';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UserRole } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(AuthGuard('local')) // Use the 'local' strategy for authentication
  @Post('login')
  login(@Request() req, @Body() loginDto: LoginDto) {
    // @Body() is optional if you only care about req.user
    // Passport's LocalStrategy attaches the validated user to req.user
    console.log(process.env.JWT_SECRET, 'SIGN');
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    // Prüfen ob Username bereits existiert
    if (!dto || !dto.username || !dto.password) {
      console.log('dto:' + dto);
      console.log('username:' + dto.username);
      console.log('password:' + dto.password);
      throw new BadRequestException('username and password are required');
    }

    const existing = await this.usersService.findByUsername(dto.username);
    if (existing) {
      throw new BadRequestException('Username already taken');
    }

    // Passwort hashen und User anlegen
    const hashed = await bcrypt.hash(dto.password, 10);
    const userToCreate = { ...dto, role: UserRole.MEMBER, password: hashed };

    const created = await this.usersService.create(userToCreate);
    // Passwort nicht zurückgeben
    const { password, ...safe } = created as any;
    return safe;
  }
}
