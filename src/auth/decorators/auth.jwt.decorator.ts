import {
    applyDecorators,
    createParamDecorator,
    ExecutionContext,
    SetMetadata,
    UseGuards,
} from '@nestjs/common';
import { AuthJwtAccessGuard } from 'src/auth/guards/jwt-access-token/auth.access-token.guard';
import { AuthJwtRefreshGuard } from 'src/auth/guards/jwt-refresh-token/auth.refresh-token.guard';
import { RolePayloadTypeGuard } from 'src/auth/guards/role.payload.type.guard';
import { ROLE_TYPE_META_KEY } from 'src/user/constants/user.constants';
import { ENUM_ROLE_TYPE } from 'src/user/constants/user.enum.constants';

export const AuthJwtPayload = createParamDecorator(
    (data: string, ctx: ExecutionContext): Record<string, any> => {
        const { user } = ctx.switchToHttp().getRequest();
        return data ? user[data] : user;
    }
);

export const AuthJwtToken = createParamDecorator(
    (data: string, ctx: ExecutionContext): string => {
        const { headers } = ctx.switchToHttp().getRequest();
        const { authorization } = headers;
        const authorizations: string[] = authorization.split(' ');

        return authorizations.length >= 2 ? authorizations[1] : undefined;
    }
);

export function AuthJwtAccessProtected(): MethodDecorator {
    return applyDecorators(UseGuards(AuthJwtAccessGuard));
}

export function AuthJwtRefreshProtected(): MethodDecorator {
    return applyDecorators(UseGuards(AuthJwtRefreshGuard));
}

export function AuthJwtAdminAccessProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(AuthJwtAccessGuard, RolePayloadTypeGuard),
        SetMetadata(ROLE_TYPE_META_KEY, [
            ENUM_ROLE_TYPE.ADMIN,
            ENUM_ROLE_TYPE.SUPER_ADMIN,
        ])
    );
}

export function AuthJwtSuperAdminAccessProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(AuthJwtAccessGuard, RolePayloadTypeGuard),
        SetMetadata(ROLE_TYPE_META_KEY, [ENUM_ROLE_TYPE.SUPER_ADMIN])
    );
}
