import { Module } from "@nestjs/common";
import { ObjectionModule } from "nestjs-objection/dist";
import { BrandsController } from "./brand.controller";
import { BrandsService } from "./brand.service";
import { Brands } from "./entities/brands.entity";


@Module({
    imports: [
        ObjectionModule.forFeature([Brands]),
    ],
    controllers: [BrandsController],
    providers: [BrandsService]
})

export class BrandsModule{}