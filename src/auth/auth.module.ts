import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { Employee } from "employees/entities/employee.entity";
import { Manager } from "managers/entities/manager.entity";
import { EXPIRES_IN, JWT_KEY } from "./constans/jwt.constans";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Employee, Manager]),
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: {
        expiresIn: EXPIRES_IN,
      },
      global: true,
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}