import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseIntPipe,
    Headers,
    UseGuards
} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {VerifyEmailDto} from "./dto/verify-email.dto";
import {UserLoginDto} from "./dto/user-login.dto";
import {ValidationPipe} from "./validation.pipe";
import {AuthService} from "../auth/auth.service";
import {UserInfo} from "./UserInfo";
import {AuthGuard} from "../guard/AuthGuard";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {
    }

    @Post()
    create(@Body() dto: CreateUserDto) {
        const {name, email, password} = dto;
        return this.usersService.create(name, email, password);
    }

    @Post('/email-verify')
    async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
        const { signupVerifyToken } = dto;
        return this.usersService.verifyEmail(signupVerifyToken);
    }

    @Post('/login')
    async login(@Body() dto: UserLoginDto): Promise<string> {
        const { email, password } = dto;

        return await this.usersService.login(email, password);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getUserInfo(@Headers() headers: any, @Param('id') id: string): Promise<UserInfo>{
        return this.usersService.getUserInfo(id);
    }

}
