import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string;
}

export class RegistrationDto extends LoginDto {
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  userName: string;
}
