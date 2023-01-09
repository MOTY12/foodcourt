import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from "@nestjs/common";
import { Roles } from "src/decorators/roles.decorator";
import { AddonService } from "./addon.services";
import { CreateAddonDto, GetAddonDto, UpdateAddonDto } from "./dto/addon.dto";



@Controller('brands')
export class AddonController {
    constructor(
        private readonly addonService: AddonService
    ){}

    @Roles('admin')
    @Post('/:brandId/addon')
    async createAddon(@Request() request, @Param('brandId') brandId: number, @Body() createAddonDto: CreateAddonDto){
        return this.addonService.createAddon(request.decoded, brandId, createAddonDto);
    }

    @Roles('admin')
    @Get('/:brandId/addon')
    async getAddon( @Param('brandId') brandId: number, @Body() queryString: GetAddonDto){
        return this.addonService.getAddon(brandId, queryString);
    }

    @Roles('admin')
    @Get('/:brandId/addon/:addonId')
    async getAddonById( @Param('brandId') brandId: number, @Param('addonId') addonId: number){
        return this.addonService.getAddonById(brandId, addonId);
    }

    @Roles('admin')
    @Patch('/:brandId/addon/:addonId')
    async updateAddon(@Request() request, @Param('brandId') brandId: number, @Param('addonId') addonId: number, @Body() updateAddonDto: UpdateAddonDto){
        return this.addonService.updateAddon(request.decoded, brandId, addonId, updateAddonDto);
    }

    @Roles('admin')
    @Delete('/:brandId/addon/:addonId')
    async deleteAddon(@Request() request, @Param('brandId') brandId: number, @Param('addonId') addonId: number){
        return this.addonService.deleteAddon(request.decoded, brandId, addonId);
    }

}