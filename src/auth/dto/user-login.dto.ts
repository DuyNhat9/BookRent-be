import { IsString, MinLength } from 'class-validator';

export class UserLoginDto {
    @IsString()
    @MinLength(6)
    usernameOrEmail: string;

    @IsString()
    @MinLength(6)
    password: string;
}
