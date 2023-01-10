import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-objection/dist";
import { Brands } from "../brands/entities/brands.entity";
import { AddonCategoryDto, CreateAddonDto, GetAddonDto, UpdateAddonDto } from "./dto/addon.dto";
import { Addons } from "./entities/addon.entities";
import { AddonCategories  } from "./entities/addonCategory.entities";


@Injectable()
export class AddonService{
    constructor(
        @InjectModel(Addons) private readonly addonModel: typeof Addons,
        @InjectModel(Brands) private readonly brandModel: typeof Brands,
        @InjectModel(AddonCategories) private readonly addonCategoryModel: typeof AddonCategories
    ){}

    async createAddon(userInfo: any, brandId: number, createAddonDto: CreateAddonDto): Promise<any>{
        try{
            //check if brand exists
            const brand = await this.brandModel.query().findById(brandId);
            if(!brand){
                throw new HttpException('Brand does not exist', 404)
            }

            let info:any = {
                userId: userInfo.id,
                name: createAddonDto.name,
                price: createAddonDto.price,
                description: createAddonDto.description,
                category: createAddonDto.category,
                brand_id: brandId,
            }

            const result = await this.addonModel.query().insert(info)

            return {
                statusCode:  HttpStatus.OK,
                message: 'User created successfully',
                data: result
            };
        }catch(error){
            throw new HttpException(error.message, 400)
           
        }
    }

    async getAddon(brandId: number, queryString: GetAddonDto): Promise<any>{
        try {
            let pageOptions = {
                page: queryString.page || 0,
                limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
               
              }
              let modelParameter: any = {
                brand_id: brandId,
                isDeleted: false
              };

              
            //check if brand exists
            const brand = await this.brandModel.query().findById(brandId)
             

            if(!brand){
                throw new HttpException('Brand does not exist', 404)
            }

            //get the addons
            const result = await this.addonModel.query().page(pageOptions.page, pageOptions.limit).where(modelParameter).withGraphFetched('Brandsref');
            return {
                statusCode:  HttpStatus.OK,
                message: 'Addon fetched successfully',
                data: result
            };
        } catch (error) {
            // throw new HttpException(error.message, 400)
            console.log(error)
        }
    }


    async getAddonById(brandId: number, addonId: number): Promise<any>{
        try {
            //check if brand exists
            const brand = await this.brandModel.query().findById(brandId)

            if(!brand){
                throw new HttpException('Brand does not exist', 404)
            }

        
            //get the addon
            const result = await this.addonModel.query().
            findOne({
                brand_id: brandId,
                id: addonId,
                isDeleted: false
            }).withGraphFetched('Brandsref')
            .withGraphFetched('categoryRef')
            
            ;

            return {
                statusCode:  HttpStatus.OK,
                message: 'Addon fetched successfully',
                data: result
            };
        } catch (error) {
            // throw new HttpException(error.message, 400)
            console.log(error)
        }
    }

    async updateAddon(userInfo: any, brandId: number, addonId: number, updateAddonDto: UpdateAddonDto): Promise<any>{
        try {
            //check if brand exists
            const brand = await this.brandModel.query().findById(brandId)

            if(!brand){
                throw new HttpException('Brand does not exist', 404)
            }

            //check if user add the addon
            const addon = await this.addonModel.query().
            findOne({
                userId: userInfo.id,
                brand_id: brandId,
                id: addonId,
                isDeleted: false
            })

            if(!addon){
                throw new HttpException('Addon does not exist', 404)
            }

            //get the addon
            const result = await this.addonModel.query().
            patchAndFetchById(addonId, {
                name: updateAddonDto.name,
                price: updateAddonDto.price,
                description: updateAddonDto.description,
                category: updateAddonDto.category,
            })

            return {
                statusCode:  HttpStatus.OK,
                message: 'Addon updated successfully',
                data: result
            };
        } catch (error) {
            throw new HttpException(error.message, 400)
        }
    }

    async deleteAddon(userInfo: any, brandId: number, addonId: number): Promise<any>{
        try {
            const addon = await this.addonModel.query().
            findOne({
                userId: userInfo.id,
                brand_id: brandId,
                id: addonId,
                isDeleted: false
            })

            if(!addon){
                throw new HttpException('Addon does not exist', 404)
            }

            let info:any = {
                isDeleted: true
            }

            //delete the addon
            const result = await this.addonModel.query().
            patchAndFetchById(addonId, info)

            return {
                statusCode:  HttpStatus.OK,
                message: 'Addon deleted successfully',
                data: result
            };
        } catch (error) {
            throw new HttpException(error.message, 400)
        }

    }

    async createAddonCategory(userInfo: any, addonCategoryDto: AddonCategoryDto ): Promise<any> {
        try{

            const res = await this.addonCategoryModel.query().insert({
                userId: userInfo.id,
                name: addonCategoryDto.name
            })

            return {
                statusCode:  HttpStatus.OK,
                message: 'Category created successfully',
                data: res
            }
        }catch(error){
            throw new HttpException(error.message, 400) 
        }
    }



}