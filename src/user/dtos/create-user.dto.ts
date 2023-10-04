import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    MaxLength,
    MinLength,
    ValidateIf,
} from 'class-validator';

export class UserCreateDto {
    @ApiProperty({
        example: faker.internet.email(),
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    @Type(() => String)
    readonly email: string;

    @ApiProperty({
        example: faker.person.fullName(),
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(30)
    @Type(() => String)
    readonly fullName: string;

    @ApiProperty({
        example: faker.phone.number('62812#########'),
        required: true,
    })
    @IsString()
    @MinLength(10)
    @MaxLength(14)
    @ValidateIf((e) => e.mobileNumber !== '')
    @Type(() => String)
    readonly phone: string;

    @ApiProperty({
        description: 'string password',
        example: `${faker.string.alphanumeric(5).toLowerCase()}${faker.string
            .alphanumeric(5)
            .toUpperCase()}@@!123`,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Type(() => String)
    readonly password: string;

    @ApiProperty({
        example: faker.internet.userName,
        required: true,
    })
    @IsString()
    @MinLength(6)
    @MaxLength(100)
    readonly username: string;

    @ApiProperty({
        example: faker.location.streetAddress({ useFullAddress: true }),
        required: false,
    })
    @IsString()
    @IsOptional()
    readonly address?: string;
}
