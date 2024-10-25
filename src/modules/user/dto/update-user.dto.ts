import { PartialType } from '@nestjs/mapped-types';
import { SignupRequestDto } from './signupRequest.dto';

export class UpdateUserDto extends PartialType(SignupRequestDto) {}
