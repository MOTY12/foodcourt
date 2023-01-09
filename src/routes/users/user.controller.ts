import { Body, Controller, Post } from "@nestjs/common";
import { CreateUsersDto, LoginDto } from "./dto/user.dto";
import { UserService } from "./user.service";


@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post('/register')
    async createUser(@Body() createUsersDto: CreateUsersDto) {
        return await this.userService.createUser(createUsersDto);
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto): Promise<any> {
      return await this.userService.login(loginDto);
    }



}
