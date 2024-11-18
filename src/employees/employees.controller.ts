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
  @UseInterceptors(FileInterceptor("employeePhoto"))
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      return this.employeesService.create(createEmployeeDto);
    } else {
      const photoUrl = await this.awsService.uploadFile(file);
      createEmployeeDto.employeePhoto = photoUrl;
      return this.employeesService.create(createEmployeeDto);
    }
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
      employeePhoto: response,
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
  @UseInterceptors(FileInterceptor("employeePhoto"))
  @Patch(":id")
  async update(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file.originalname == "undefined") {
      return this.employeesService.update(id, updateEmployeeDto);
    } else {
      const fileUrl = await this.awsService.uploadFile(file);
      updateEmployeeDto.employeePhoto = fileUrl;
      return this.employeesService.update(id, updateEmployeeDto);
    }  }

  @Auth(ROLES.MANAGER)
  @Delete(":id")
  remove(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.employeesService.remove(id);
  }
}
