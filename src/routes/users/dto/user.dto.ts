import { IsNotEmpty, IsString } from "class-validator";

export class CreateUsersDto {

    @IsString()
    @IsNotEmpty()
    readonly name: String;

    @IsNotEmpty()
    @IsString()
    readonly email: String;

    @IsNotEmpty()
    @IsString()
    readonly role: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    readonly email: String;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
