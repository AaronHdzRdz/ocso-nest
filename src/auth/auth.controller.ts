import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUSerDto } from './dto/updateUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post("signup")
  signup(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.registerUser(CreateUserDto)
  }
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto)
    
  }
  @Patch("/:email")
  updateUser(@Param('email') userEmail:string, @Body() updateUSerDto: UpdateUSerDto){
    return this.authService.updateUser(userEmail, updateUSerDto)
  }
}
