
import { Injectable, CanActivate, ExecutionContext, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { PUBLIC } from '../decorators';
import { UserRepository } from '../../models';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly userRepository: UserRepository,
        private readonly reflector: Reflector
    ) { }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        try {
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

            const userExistance = await this.userRepository.getOne({ _id: payload.id })

            if (!userExistance) throw new NotFoundException('User not found');
            request.user = userExistance;

            return true;
        } catch (error) {
            if (error instanceof Error) {
                throw new UnauthorizedException(error.message);
            }
            throw new UnauthorizedException('Something went wrong');
        }
    }

}
