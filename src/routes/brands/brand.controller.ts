import { Body, Controller, Post, Request } from "@nestjs/common";
import { BrandsService } from "./brand.service";
import { CreateBrandsDto } from "./dto/brands.dto";


@Controller('brands')
export class BrandsController {
    constructor(
        private readonly brandsService: BrandsService
    ){}

    @Post('/')
    async createBrand(@Request() request, @Body() createBrandsDto: CreateBrandsDto) {
        return this.brandsService.createBrand(request.decoded, createBrandsDto);  
    }
}