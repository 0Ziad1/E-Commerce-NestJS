
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PUBLIC, Roles } from '../decorators';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { };
    canActivate(
        context: ExecutionContext,
    ): boolean {
        const publicValue = this.reflector.get(PUBLIC, context.getHandler())

        if (publicValue) return true;

        const roles = this.reflector.getAllAndMerge(Roles, [context.getClass(), context.getHandler()]);
        if (!roles) return true;
        const request = context.switchToHttp().getRequest();
        if (!roles.includes(request.user.roles)) {
            throw new UnauthorizedException("You are Not allowed")
        }

        return true;
    }
}