import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateAddonDto{
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    readonly price: number;

    @IsNumber()
    @IsOptional()
    readonly category: number;
}

export class GetAddonDto {
    @IsOptional()
    @IsNumberString()
    readonly page: number;

    @IsOptional()
    @IsNumberString()
    readonly limit: number;
}

export class UpdateAddonDto {
    @IsString()
    @IsOptional()
    readonly name: string;

    @IsString()
    @IsOptional()
    readonly description: string;

    @IsNumber()
    @IsOptional()
    readonly price: number;

    @IsNumber()
    @IsOptional()
    readonly category: number;
}


export class AddonCategoryDto {
    @IsString()
    @IsOptional()
    readonly name: string

}