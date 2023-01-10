import { columnTypes, Model, Column, Table, Relation, relationTypes} from "nestjs-objection";
import { RelationMappings, RelationMappingsThunk } from "objection";
import { Brands } from "src/routes/brands/entities/brands.entity";
import { AddonCategories } from "./addonCategory.entities";


@Table({ tableName: "Addon" })
export class Addons extends Model{


    @Column({
        type: columnTypes.increments,
        primary: true,
        notNullable: true
    })
    id: number

    @Column({
        type: columnTypes.string,
        notNullable: true
    })
    name: string;

    @Column({
        type: columnTypes.number,
        notNullable: true
    })
    userId: number;

    @Column({
        type: columnTypes.string,
        notNullable: true
    })
    description: string;

    @Column({
        type: columnTypes.number,
        notNullable: true
    })
    price: number;

    @Column({
        type: columnTypes.number,
        notNullable: true
    })
    category: number;

    @Column({
        type: columnTypes.number,
        notNullable: true
    })
    brand_id: number;
    
    @Column({
        type: columnTypes.boolean,
        notNullable: true,
        default: false
    })
    isDeleted: boolean;



    static get relationMappings() {
        return {
            categoryRef: {
                relation: relationTypes.BelongsToOneRelation,
                modelClass: AddonCategories,
                join: {
                    from: 'Addon.category',
                    to: 'AddonCategory.id'
                }
            },
            Brandsref: {
                relation: relationTypes.BelongsToOneRelation,
                modelClass: Brands,
                join: {
                    from: 'Addon.brand_id',
                    to: 'brands.id'
                }
            }
        }
    }
}