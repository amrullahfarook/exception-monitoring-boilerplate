
import { MonitoringConnection } from "src/utils/monitoringConnection";
import { MonitoringRepository } from "src/utils/monitoringRepository";

@Controller('user')
export class UserController {
    constructor(private userService : UserService, private monitoringConnection: MonitoringConnection, private monitoringRepository: MonitoringRepository, @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,) {
        this.monitoringConnection.startMonitoring()
    }

    @Post('register')
    async registerUserController(@Body() dto: RegisterDto,  @Res({ passthrough: true }) res: Response) {

        try {
            const {name, password, email} = dto
            await this.userService.registerUserService({ name, email, password })
            const { refreshToken, accessToken } = await this.userService.loginUserService({ email, password, });        
            res.cookie('jwt', refreshToken, {httpOnly:true, sameSite:'none', maxAge:24*60*60*1000})
            res.status(200);

            return { accessToken };            
        } catch (error: any) {
            this.logger.error(error.message);
            this.monitoringRepository.reportError(error)
            throw new Error(error.message);            
        }

    }

}