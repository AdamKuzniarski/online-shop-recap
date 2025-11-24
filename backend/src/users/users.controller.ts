import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import your JWT guard

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // No guard here, as user creation is often public for registration
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Get()
  findAll(@Request() req) {
    // You can access the authenticated user via req.user
    console.log('Authenticated user:', req.user);
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    // You might want to add authorization logic here (e.g., only owner or admin can see)
    if (req.user.userId !== id && !req.user.roles.includes('admin')) {
      // Example: If user is not the owner and not an admin
      // throw new ForbiddenException();
    }
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    // Add authorization logic here
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    // Add authorization logic here
    return this.usersService.delete(id);
  }
}
