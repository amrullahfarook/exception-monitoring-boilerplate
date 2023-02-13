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