import { Module } from "@nestjs/common";
import { CustomerRepository } from "../../models/customer/customer.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { User, userSchema } from "../../models/common/userSchema";
import { Customer, customerSchema } from "../../models/customer/customer.schema";

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: User.name, schema: userSchema,
            discriminators: [
                { name: Customer.name, schema: customerSchema }]
        }
    ])],
    providers: [CustomerRepository],
    exports: [CustomerRepository]
})
export class UserMongoModule { };