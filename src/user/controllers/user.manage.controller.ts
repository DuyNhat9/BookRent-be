import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthJwtAdminAccessProtected } from 'src/auth/decorators/auth.jwt.decorator';
import {
    PaginationQuery,
    PaginationQueryFilterInBoolean,
    PaginationQueryFilterInEnum,
} from 'src/common/pagination/decorators/pagination.decorator';
import { PaginationListDto } from 'src/common/pagination/dto/pagination.list.dto';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { RequestParamGuard } from 'src/lib/guards/request.decorator';
import { ENUM_ROLE_TYPE } from 'src/user/constants/user.enum.constants';
import {
    USER_DEFAULT_AVAILABLE_ORDER_BY,
    USER_DEFAULT_AVAILABLE_SEARCH,
    USER_DEFAULT_BLOCKED,
    USER_DEFAULT_INACTIVE_PERMANENT,
    USER_DEFAULT_IS_ACTIVE,
    USER_DEFAULT_ORDER_BY,
    USER_DEFAULT_ORDER_DIRECTION,
    USER_DEFAULT_PER_PAGE,
    USER_DEFAULT_ROLE,
} from 'src/user/constants/user.list-constants';
import { UserAdminGetGuard } from 'src/user/decorators/user.admin.decorator';
import { GetUser, UserProtected } from 'src/user/decorators/user.decorator';
import { UserRequestDto } from 'src/user/dtos/get-user.dto';
import { IUserDoc, IUserEntity } from 'src/user/interfaces/user.interface';
import { UserDoc } from 'src/user/repository/user.entity';
import { UserService } from 'src/user/services/user.service';
@ApiTags('modules.admin.user')
@Controller({
    path: '/user',
})
export class UserManageController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly userService: UserService
    ) {}

    //TODO: IMPLEMENT POLICY HERE
    @ApiOperation({
        tags: ['admin', 'user'],
        description: 'Get list of users in database',
        summary: 'List user',
    })
    @AuthJwtAdminAccessProtected()
    @Get('/list')
    async list(
        @PaginationQuery(
            USER_DEFAULT_PER_PAGE,
            USER_DEFAULT_ORDER_BY,
            USER_DEFAULT_ORDER_DIRECTION,
            USER_DEFAULT_AVAILABLE_SEARCH,
            USER_DEFAULT_AVAILABLE_ORDER_BY
        )
        { _search, _limit, _offset, _order }: PaginationListDto,
        @PaginationQueryFilterInBoolean('isActive', USER_DEFAULT_IS_ACTIVE)
        isActive: Record<string, any>,
        @PaginationQueryFilterInBoolean('blocked', USER_DEFAULT_BLOCKED)
        blocked: Record<string, any>,
        @PaginationQueryFilterInBoolean(
            'inactivePermanent',
            USER_DEFAULT_INACTIVE_PERMANENT
        )
        inactivePermanent: Record<string, any>,
        @PaginationQueryFilterInEnum('role', USER_DEFAULT_ROLE, ENUM_ROLE_TYPE)
        role: Record<string, any>
    ) {
        const find: Record<string, any> = {
            ..._search,
            ...isActive,
            ...blocked,
            ...inactivePermanent,
            ...role,
        };

        const users: IUserEntity[] = await this.userService.findAll(find, {
            paging: {
                limit: _limit,
                offset: _offset,
            },
            order: _order,
        });

        const total: number = await this.userService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );

        return {
            _pagination: { total, totalPage },
            data: users,
        };
    }

    @UserAdminGetGuard()
    @RequestParamGuard(UserRequestDto)
    @AuthJwtAdminAccessProtected()
    @Get('/get/:user')
    async get(@GetUser() user: UserDoc): Promise<any> {
        return { data: user.toObject() };
    }
}
