import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from 'jsonwebtoken';
import { InjectModel } from "nestjs-objection/dist";
import { Model } from "objection";
import { Users } from "src/routes/users/entities/user.entity";

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(
        @InjectModel(Users) private readonly userModel: typeof Users,
        private configService: ConfigService
    ){}
    async use(req: any, res: any, next: () => void) {
        // check header or url parameters or post parameters for token
        const token = req.headers['Authorization'] || req.headers['authorization'];

        if (!token) {
        throw new HttpException('Authorization header not found - Access Restricted!', HttpStatus.FORBIDDEN);
        }

        if(token.substr(0, 7) != "Bearer ") {
            throw new HttpException('Invalid authorization header - Access Restricted!', HttpStatus.FORBIDDEN);
        }
      
        let decodedToken;

        try {
            decodedToken = await jwt.verify(token.substr(7), this.configService.get('APPLICATION_KEY'));
        }catch (err) { 
            throw new HttpException('Expired token - Access Restricted!', HttpStatus.FORBIDDEN);
        }
        
        const user = await this.userModel.query().findOne({
            id: decodedToken.id,
            isDeleted: false
          });


          if(!user) {
            throw new HttpException('Invalid user - Access Restricted!', HttpStatus.FORBIDDEN);
          }
      
          req.decoded = decodedToken;
          next();
          
    }
}