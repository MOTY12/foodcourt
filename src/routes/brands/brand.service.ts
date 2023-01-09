import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-objection/dist";
import { CreateBrandsDto } from "./dto/brands.dto";
import { Brands } from "./entities/brands.entity";



@Injectable()
export class BrandsService {
    constructor(
        @InjectModel(Brands) private readonly brandsModel: typeof Brands
    ){}

    async createBrand(userInfo: any, createBrandsDto: CreateBrandsDto): Promise<Brands> {
        try {
        
            let info = {
                userId: userInfo.id,
                name: createBrandsDto.name,
            }
            const result =  await this.brandsModel.query().insert(info);
            
            return result;
            
        } catch (error) {
            console.log(error)    
        }
    }

    
}