import {
    applyDecorators,
    createParamDecorator,
    ExecutionContext,
    SetMetadata,
    UseGuards,
} from '@nestjs/common';
import { IRequestApp } from 'src/common/pagination/interfaces/request.interface';
import { USER_BLOCKED_META_KEY, USER_ACTIVE_META_KEY, USER_INACTIVE_PERMANENTLY_META_KEY } from 'src/user/constants/user.constants';
import { UserActiveGuard } from 'src/user/guards/user.active.guard';
import { UserBlockedGuard } from 'src/user/guards/user.blocked.guard';
import { UserInactivePermanentGuard } from 'src/user/guards/user.inactive.guard';
import { UserNotFoundGuard } from 'src/user/guards/user.notfound.guard';
import { UserPayloadPutToRequestGuard } from 'src/user/guards/user.payload.put-to-request.guard';
import { UserDoc, UserEntity } from 'src/user/repository/user.entity';

export const GetUser = createParamDecorator(
    (returnPlain: boolean, ctx: ExecutionContext): UserDoc | UserEntity => {
        const { __user } = ctx
            .switchToHttp()
            .getRequest<IRequestApp & { __user: UserDoc }>();
        return returnPlain ? __user.toObject() : __user;
    }
);

export function UserProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(UserPayloadPutToRequestGuard, UserNotFoundGuard)
    );
}

export function UserAuthProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(
            UserBlockedGuard,
            UserInactivePermanentGuard,
            UserActiveGuard
        ),
        SetMetadata(USER_INACTIVE_PERMANENTLY_META_KEY, [false]),
        SetMetadata(USER_BLOCKED_META_KEY, [false]),
        SetMetadata(USER_ACTIVE_META_KEY, [true])
    );
}