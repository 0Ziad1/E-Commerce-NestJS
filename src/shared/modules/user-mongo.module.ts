import { Module } from "@nestjs/common";
import { CustomerRepository } from "../../models/customer/customer.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { User, userSchema } from "../../models/common/userSchema";
import { Customer, customerSchema } from "../../models/customer/customer.schema";
import { Admin, adminSchema, UserRepository } from "../../models";

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: User.name, schema: userSchema,
            discriminators: [
                { name: Customer.name, schema: customerSchema },
                { name: Admin.name, schema: adminSchema }
            ]
        }
    ])],
    providers: [
        CustomerRepository,
        UserRepository
    ],
    exports: [
        CustomerRepository,
        UserRepository
    ]
})
export class UserMongoModule { };