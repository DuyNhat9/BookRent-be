import { Body, Controller, ForbiddenException, Get, Patch } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthJwtAccessProtected, AuthJwtPayload } from 'src/auth/decorators/auth.jwt.decorator';
import { GetUser, UserProtected } from 'src/user/decorators/user.decorator';
import { UserChangePasswordDto } from 'src/user/dtos/change-password.dto';
import { UserUpdateDto } from 'src/user/dtos/update-user.dto';
import { UserDoc } from 'src/user/repository/user.entity';
import { UserService } from 'src/user/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @AuthJwtAccessProtected()
  @ApiOperation({
    tags: ['user', 'jwt'],
    summary: "Get user jwt's info",
    description: "Get user's jwt and decrypt into data. This also mean if there any thing change on database, this endpoint will no reflect it"
  })
  @Get('/info')
  async info(
    @AuthJwtPayload() payload: Record<string, any>
  ): Promise<any> {
    return { data: payload };
  }


  @ApiOperation({
    tags: ['user', 'profile'],
    summary: "Get user personal information",
    description: "Get latest user information from database"
  })
  @UserProtected()
  @AuthJwtAccessProtected()
  @Get('/profile')
  async profile(@GetUser() user: UserDoc): Promise<any> {

    return { data: user.toObject() };
  }

  @ApiOperation({
    tags: ['user', 'profile'],
    summary: "Update user's information",
    description: "Update user information, this won't update jwt, please manualy refresh it by refresh-token"
  })
  @UserProtected()
  @AuthJwtAccessProtected()
  @Patch('/profile/update')
  async updateProfile(
    @GetUser() user: UserDoc,
    @Body() body: UserUpdateDto,
  ) {
    await this.userService.updateName(user, body);
    await this.userService.updateAddress(user, body)

    return;
  }

}
