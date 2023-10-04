import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthJwtAccessGuard extends AuthGuard('jwt') {
    handleRequest<TUser = any>(err: Error, user: TUser, info: Error): TUser {
        if (err || !user) {
            throw new UnauthorizedException({
                statusCode: 404,
                message: 'Access Token Invalid',
                _error: err ? err.message : info.message,
            });
        }

        return user;
    }
}
