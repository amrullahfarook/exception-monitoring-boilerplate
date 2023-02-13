import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { User, UserSchema } from "../database/models/user.model";
import { UserRepository } from "../database/repositories/user.repository";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { JwtStrategy } from './jwt.strategy';
import { MonitoringConnection } from "src/utils/monitoringConnection";
import { MonitoringRepository } from "src/utils/monitoringRepository";

@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository, JwtStrategy, MonitoringConnection, MonitoringRepository],
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        PassportModule.register({ defaultStrategy: 'jwt' })
    ]
})
export class UserModule {}