import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { UserData } from 'src/auth/decorators/user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constans/roles.constants';
import { AuthApi } from 'src/auth/decorators/api.decorator';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) { }

  @Auth(ROLES.MANAGER)
  @AuthApi()
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @AuthApi()
  @Get()
  findAll(@UserData() user: User) {
    if (user.userRoles.includes("Employee")) throw new UnauthorizedException("No estas autorizado solamente los administradores y los managers pueden ver los proveedores");
    return this.providersService.findAll();
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @AuthApi()
  @Get('/name/:name')
  findByName(@Param('name') name: string) {
    return this.providersService.findOneByName(name);
  }
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @AuthApi()
  @Get(':id')
  findOne(@Param('id') id: string) {
    const provider = this.providersService.findOne(id);
    if (!provider) throw new NotFoundException()
    return provider;
  }

  @Auth(ROLES.MANAGER)
  @AuthApi()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Auth(ROLES.MANAGER)
  @AuthApi()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}