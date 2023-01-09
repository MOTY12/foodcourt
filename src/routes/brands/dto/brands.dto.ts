import { IsNotEmpty, IsNumber, IsString } from "class-validator";



export class CreateBrandsDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    // @IsNotEmpty()
    // @IsNumber()
    // owner_id: number;

}