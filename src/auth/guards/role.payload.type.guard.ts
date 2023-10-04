import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { _ } from 'lodash';
import { ROLE_TYPE_META_KEY } from 'src/user/constants/user.constants';
import { ENUM_ROLE_TYPE } from 'src/user/constants/user.enum.constants';
@Injectable()
export class RolePayloadTypeGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredFor: ENUM_ROLE_TYPE[] = this.reflector.getAllAndOverride<
            ENUM_ROLE_TYPE[]
        >(ROLE_TYPE_META_KEY, [context.getHandler(), context.getClass()]);
        const { user } = context.switchToHttp().getRequest();
        const { type } = user;
        if (!requiredFor || type === ENUM_ROLE_TYPE.SUPER_ADMIN) {
            return true;
        }
        const hasFor: boolean = _.includes(requiredFor, type);
        if (!hasFor) {
            throw new ForbiddenException({
                message: 'Forbidden Resource',
            });
        }
        return hasFor;
    }
}
