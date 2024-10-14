import { IsEmail, IsNumber, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";
import { Location } from "locations/entities/location.entity";

export class CreateManagerDto extends Manager {
    @IsString()
    managerName: string;
    @IsNumber()
    managerSalary: number;
    @IsString()
    @IsEmail()
    managerEmail: string;
    @IsString()
    @MaxLength(13)
    managerPhoneNumber: string;
    @IsObject()
    @IsOptional()
    location: Location;
}
