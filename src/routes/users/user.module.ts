import { Module } from "@nestjs/common";
import { ObjectionModule } from "nestjs-objection/dist";
import { Users } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
    imports: [
        ObjectionModule.forFeature([Users]),
    ],
    controllers: [UserController],
    providers: [UserService]
})

export class UsersModule{}