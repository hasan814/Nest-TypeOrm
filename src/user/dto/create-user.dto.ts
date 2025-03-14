import { IsString, IsInt, IsEmail, Min, Max, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50, { message: "First name must be between 2 and 50 characters long." })
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50, { message: "Last name must be between 2 and 50 characters long." })
  last_name: string;

  @IsEmail({}, { message: "Invalid email format." })
  email: string;

  @IsNotEmpty()
  @IsInt({ message: "Age must be an integer." })
  @Min(1, { message: "Age must be at least 1." })
  @Max(120, { message: "Age must be at most 120." })
  age: number;
}
