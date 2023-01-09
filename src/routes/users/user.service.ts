import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-objection/dist";
import { CreateUsersDto, LoginDto } from "./dto/user.dto";
import { Users } from "./entities/user.entity";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class UserService{
    constructor(
        @InjectModel(Users) private readonly userModel: typeof Users,
        private readonly configService: ConfigService,
    ){}

    async createUser(createUsersDto: CreateUsersDto): Promise<Users> {
        try {
            //let check if the user already exists
            const checkUser = await this.userModel.query().findOne({
                email: createUsersDto.email,
                isDeleted: false
            });

            if(checkUser) {
                throw new HttpException('User already exists', 400)
            }
            
            const hashedPassword = await bcrypt.hash(createUsersDto.password, 10);

            let userInfo:any = {
                name: createUsersDto.name,
                email: createUsersDto.email,
                password: hashedPassword,
                role: createUsersDto.role
            }

            const result = await this.userModel.query().insert(userInfo);
            let res:any = {
                statusCode:  HttpStatus.OK,
                message: 'User created successfully',
                data: result
            }

            return res;

            
        } catch (error) {
            throw new HttpException(error.message, 400)
           
        }
    }

    async login(loginDto: LoginDto): Promise<any> {
        const checkUser = await this.userModel.query().findOne({
            email: loginDto.email,
            isDeleted: false
        });
        if (!checkUser) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Email does not exist."
              }
        }
        let match = await bcrypt.compare("" + loginDto.password, "" + checkUser.password);
        if (!match) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Your Password is incorrect. Please try again."
              }
        }

        let user = await this.userModel.query().findOne({
            email: loginDto.email,
            isDeleted: false
          });
      
          let jwtObject: any = JSON.parse(JSON.stringify(user));
      
          delete jwtObject.passwordUpdatedAt;

          let apiToken = await jwt.sign(jwtObject, this.configService.get('APPLICATION_KEY'), {
            expiresIn: "1d"
          });
      
          jwtObject.apiToken = apiToken;
      
          return {
            statusCode: HttpStatus.OK,
            message: "User login successful.",
            data: jwtObject
          }

    }


}