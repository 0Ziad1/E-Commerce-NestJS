
import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CustomerRepository } from '../../models/customer/customer.repository';
import { Reflector } from '@nestjs/core';
import { PUBLIC } from '../decorators';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly customerRepository: CustomerRepository,
        private readonly reflector: Reflector
    ) { }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const publicValue = this.reflector.get(PUBLIC, context.getHandler())

        if (publicValue) return true;
        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;

        const payload = this.jwtService.verify<
            { email: string, id: string }
        >
            (
                authorization,
                { secret: this.configService.get('access').secure }
            )

        const customerExistance = await this.customerRepository.getOne({ _id: payload.id })

        if (!customerExistance) throw new NotFoundException('User not found');
        request.user = customerExistance;

        return true;
    }

}
