import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";
import { Employee } from "../entities/employee.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Location } from "locations/entities/location.entity";

export class CreateEmployeeDto extends Employee {
    @ApiProperty()
    @IsString()
    @MaxLength(30)
    employeeName: string; 

    @ApiProperty()
    @IsString()
    @MaxLength(70)
    employeeLastName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(10)
    employeePhoneNumber: string

    @ApiProperty()
    @IsString()
    @IsEmail()
    employeeEmail: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    location: Location;

    @ApiProperty()
    @IsOptional()
    emplyeePhoto: string;
}
