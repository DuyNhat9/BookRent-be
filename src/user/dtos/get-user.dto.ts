import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsUUID } from 'class-validator';

export class UserRequestDto {
    @IsNotEmpty()
    @IsMongoId()
    @Type(() => String)
    user: string;
}
