import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUser';

export class UpdateUSerDto extends PartialType(CreateUserDto) {}
