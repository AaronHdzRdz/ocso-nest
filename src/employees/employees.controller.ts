import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ROLES } from 'src/auth/constans/roles.constants';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { AuthApi } from 'src/auth/decorators/api.decorator';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }


  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
      employeeId: 'UUID',
      employeeName: "Sebas",
      employeeEmail: "sebas@email.com",
      location: {
        locationId: 13,
        locationName: "OCSO Entrada",
        locationLatLng: [12, -140],
        locationAddress: "Entrada Av. 5, Querétaro, México",
      }
    } as CreateEmployeeDto
  })
  @AuthApi()
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @AuthApi()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    return "ok"
  }


  @Auth(ROLES.MANAGER)
  @AuthApi()
  @Get()
  findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }


  @Auth(ROLES.MANAGER)
  @AuthApi()
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.employeesService.findOne(id);
  }

  @Auth(ROLES.MANAGER)
  @AuthApi()
  @Get('/location/:id')
  findAllLocation(@Param('id') id: string) {
    return this.employeesService.findByLocation(+id)
  }

  @Auth(ROLES.EMPLOYEE)
  @AuthApi()
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Auth(ROLES.MANAGER)
  @AuthApi()
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.employeesService.remove(id);
  }
}