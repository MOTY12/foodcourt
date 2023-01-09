import { columnTypes, Model, Column, Table} from "nestjs-objection";


@Table({ tableName: "Addon" })
export class Addon extends Model{
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

}

@Table({ tableName: "AddonCategory" })
export class AddonCategory extends Model{
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