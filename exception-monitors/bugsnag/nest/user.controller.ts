import { Body, Controller, Post, Get, Req, Res, HttpException, HttpStatus, Inject, LoggerService, UseGuards } from "@nestjs/common";
import { Request, Response } from 'express'
import { UserService } from "./user.service";
import { RegisterDto, LoginDto } from "./dto";
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AuthGuard } from "@nestjs/passport";
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

    @Post('login')
    async loginUserController(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {

        try {
            const {email, password} = dto
            const { refreshToken, accessToken } = await this.userService.loginUserService({ email, password })
            res.cookie('jwt', refreshToken, {httpOnly:true, sameSite:'none', maxAge:24*60*60*1000})
            res.status(200)

            return { accessToken }
        } catch (error: any) {
            this.logger.error(error.message);
            throw new Error(error.message);          
        }

    }

    @Get('refreshtoken')
    async refreshTokenController(@Req() req: Request, @Res({ passthrough: true }) res: Response) {

        try {
            const cookies = req.cookies
            if(!cookies?.jwt) throw new HttpException('Message: ', HttpStatus.NO_CONTENT);;
            const refreshToken = cookies.jwt as string

            const findUser = await this.userService.findUserByTokenService(
            refreshToken,
            );

            if (!findUser) return res.status(403)

            return this.userService.refreshTokenService(refreshToken)
        } catch (error) {
            this.logger.error(error.message);
            throw new Error(error.message);            
        }
    }

    @Post('logout')
    async logoutUserController(@Req() req: Request, @Res() res: Response) {
 
    try {
        const cookies = req.cookies
        if (!cookies?.jwt) return res.status(204); 
        const refreshToken = cookies.jwt as string

        await this.userService.logoutUserService(refreshToken) 
        
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        res.sendStatus(204);

        return { message: 'Successful logout' };        
    } catch (error) {
        this.logger.error(error.message);
        throw new Error(error.message);        
    }   
    }

    @Get('private')
    @UseGuards(AuthGuard('jwt'))
    async privateRouteController(@Req() req) {

        const email = req.user
        const user = await this.userService.findUserService(email)

        return user.name
    }
}