import { Module } from "@nestjs/common";
import { ObjectionModule } from "nestjs-objection/dist";
import { Brands } from "../brands/entities/brands.entity";
import { AddonController } from "./addon.controller";
import { AddonService } from "./addon.services";
import { Addons } from "./entities/addon.entities";
import { AddonCategories } from "./entities/addonCategory.entities";


@Module({
    imports: [
        ObjectionModule.forFeature([Addons, Brands, AddonCategories]),
    ],
    controllers: [AddonController],
    providers: [AddonService]
})

export class AddonModule{}