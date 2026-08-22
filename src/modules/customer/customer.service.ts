import { Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {

  getCustomer() {
    return `This action returns a # customer`;
  }


}
