
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
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


        return matchRoles(roles, request.user.roles);
    }
}
function matchRoles(roles: string[], userRole: string): boolean {
    return roles.includes(userRole);
}