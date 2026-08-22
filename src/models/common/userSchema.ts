import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    discriminatorKey: 'roles',
    timestamps: true,
    toJSON: { virtuals: true }
})
export class User {
    @Prop({ type: String, required: true })
    email!: string;
    @Prop({ type: String, required: true })
    userName!: string;
    @Prop({ type: String, required: true })
    password!: string;
    @Prop({ type: String })
    otp!: string;
    @Prop({ type: Date })
    optExpiry!: Date;
    @Prop({ type: Boolean, default: false })
    isVerified!: boolean;
}
export const userSchema = SchemaFactory.createForClass(User);