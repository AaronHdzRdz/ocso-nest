import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { Employee } from "./entities/employee.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Auth } from "auth/decorators/auth.decorator";
import { ApiAuth } from "auth/decorators/api.decorator";
import { ROLES } from "auth/constans/roles.constants";
import { AwsService } from "./../aws/aws.service";

@ApiAuth()
@ApiTags("Employees")
@Controller("employees")
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly awsService: AwsService
  ) {}

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
      employeeId: "UUID",
      employeeName: "Sebas",
      employeeEmail: "sebas@gmail.com",
      employeeLastName: "hdz",
      employeePhoneNumber: "4427851597",
    } as Employee,
  })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Post(":id/upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadPhoto(
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    const response = await this.awsService.uploadFile(file);
    return this.employeesService.update(id, {
      emplyeePhoto: response,
    });
  }

  @Auth(ROLES.MANAGER)
  @Get()
  findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @Auth(ROLES.MANAGER)
  @Get("/:id")
  findOne(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
    id: string
  ) {
    return this.employeesService.findOne(id);
  }

  @Auth(ROLES.MANAGER)
  @Get("/location/:id")
  findAllLocation(@Param("id") id: string) {
    return this.employeesService.findByLocation(+id);
  }

  @Auth(ROLES.EMPLOYEE)
  @Patch(":id")
  update(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Auth(ROLES.MANAGER)
  @Delete(":id")
  remove(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.employeesService.remove(id);
  }
}
