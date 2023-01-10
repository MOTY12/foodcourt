import { columnTypes, Model, Column, Table, Relation} from "nestjs-objection";


@Table({ tableName: "AddonCategory" })
export class AddonCategories extends Model{
    
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
        type: columnTypes.boolean,
        notNullable: true,
        default: false
    })
    isDeleted: boolean;

}