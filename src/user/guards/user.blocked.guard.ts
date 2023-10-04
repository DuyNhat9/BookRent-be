import {
    Injectable,
    CanActivate,
    ExecutionContext,
    BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IRequestApp } from 'src/common/pagination/interfaces/request.interface';
import { USER_BLOCKED_META_KEY } from 'src/user/constants/user.constants';
import { UserDoc } from 'src/user/repository/user.entity';

@Injectable()
export class UserBlockedGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const required: boolean[] = this.reflector.getAllAndOverride<boolean[]>(
            USER_BLOCKED_META_KEY,
            [context.getHandler(), context.getClass()]
        );

        if (!required) {
            return true;
        }

        const { __user } = context
            .switchToHttp()
            .getRequest<IRequestApp & { __user: UserDoc }>();

        if (!required.includes(__user.blocked)) {
            throw new BadRequestException({
                message: 'User is blocked',
            });
        }
        return true;
    }
}