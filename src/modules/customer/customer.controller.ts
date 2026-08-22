import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AuthGuard, RolesGuard } from '../../common';
import { Roles } from '../../common/decorators';


@Controller('customer')
@UseGuards(AuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }


  @Get()
  @UseGuards(RolesGuard)
  @Roles(['Customer'])
  getCustomer(@Request() req: any) {
    return {
      message: "Done.",
      success: true,
      data: req.user,

    }

  }

}
