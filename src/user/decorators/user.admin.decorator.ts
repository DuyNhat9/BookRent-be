import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import {
    USER_ACTIVE_META_KEY,
    USER_BLOCKED_META_KEY,
    USER_INACTIVE_PERMANENTLY_META_KEY,
} from 'src/user/constants/user.constants';
import { UserActiveGuard } from 'src/user/guards/user.active.guard';
import { UserBlockedGuard } from 'src/user/guards/user.blocked.guard';
import { UserCanNotOurSelfGuard } from 'src/user/guards/user.can-not-ourselft.guard';
import { UserInactivePermanentGuard } from 'src/user/guards/user.inactive.guard';
import { UserNotFoundGuard } from 'src/user/guards/user.notfound.guard';
import { UserPutToRequestGuard } from 'src/user/guards/user.put-to-request.guard';

export function UserAdminGetGuard(): MethodDecorator {
    return applyDecorators(UseGuards(UserPutToRequestGuard, UserNotFoundGuard));
}

export function UserAdminDeleteGuard(): MethodDecorator {
    return applyDecorators(
        UseGuards(
            UserPutToRequestGuard,
            UserNotFoundGuard,
            UserCanNotOurSelfGuard
        )
    );
}

export function UserAdminUpdateGuard(): MethodDecorator {
    return applyDecorators(
        UseGuards(
            UserPutToRequestGuard,
            UserNotFoundGuard,
            UserCanNotOurSelfGuard
        )
    );
}

export function UserAdminUpdateInactiveGuard(): MethodDecorator {
    return applyDecorators(
        UseGuards(
            UserPutToRequestGuard,
            UserNotFoundGuard,
            UserCanNotOurSelfGuard,
            UserBlockedGuard,
            UserInactivePermanentGuard,
            UserActiveGuard
        ),
        SetMetadata(USER_INACTIVE_PERMANENTLY_META_KEY, [false]),
        SetMetadata(USER_ACTIVE_META_KEY, [true]),
        SetMetadata(USER_BLOCKED_META_KEY, [false])
    );
}

export function UserAdminUpdateActiveGuard(): MethodDecorator {
    return applyDecorators(
        UseGuards(
            UserPutToRequestGuard,
            UserNotFoundGuard,
            UserCanNotOurSelfGuard,
            UserBlockedGuard,
            UserInactivePermanentGuard,
            UserActiveGuard
        ),
        SetMetadata(USER_INACTIVE_PERMANENTLY_META_KEY, [false]),
        SetMetadata(USER_ACTIVE_META_KEY, [false]),
        SetMetadata(USER_BLOCKED_META_KEY, [false])
    );
}

export function UserAdminUpdateBlockedGuard(): MethodDecorator {
    return applyDecorators(
        UseGuards(
            UserPutToRequestGuard,
            UserNotFoundGuard,
            UserCanNotOurSelfGuard,
            UserBlockedGuard
        ),
        SetMetadata(USER_BLOCKED_META_KEY, [false])
    );
}
