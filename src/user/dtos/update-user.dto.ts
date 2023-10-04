import { PickType } from '@nestjs/swagger';
import { UserCreateDto } from 'src/user/dtos/create-user.dto';

export class UserUpdateDto extends PickType(UserCreateDto, [
    'fullName', 'address'
] as const) { }
