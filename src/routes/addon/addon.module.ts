import { Module } from "@nestjs/common";
import { ObjectionModule } from "nestjs-objection/dist";
import { Brands } from "../brands/entities/brands.entity";
import { AddonController } from "./addon.controller";
import { AddonService } from "./addon.services";
import { Addon, AddonCategory } from "./entities/addon.entities";


@Module({
    imports: [
        ObjectionModule.forFeature([Addon, Brands, AddonCategory]),
    ],
    controllers: [AddonController],
    providers: [AddonService]
})

export class AddonModule{}