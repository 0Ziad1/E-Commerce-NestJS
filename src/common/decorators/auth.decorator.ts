import { applyDecorators, UseGuards } from "@nestjs/common"
import { Roles } from "./roles.decorator"
import { AuthGuard, RolesGuard } from "../guards"

export const Auth = (roles:string[]) => {
    return applyDecorators(Roles(roles),
    UseGuards(AuthGuard, RolesGuard))
}

