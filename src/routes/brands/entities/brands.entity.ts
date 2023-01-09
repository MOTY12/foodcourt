import { Model, Table, Column, columnTypes, Relation } from "nestjs-objection";
// import { Users } from "src/models/users.model";


@Table({ tableName: "brands" })
export class Brands extends Model {
    @Column({
        type: columnTypes.increments,
        primary: true,
        notNullable: true

    })
    id: number;

    @Column({
        type: columnTypes.string,
        notNullable: true
    })
    name: string;

    // @Relation({
    //     model: Users,
    //     relation: Model.BelongsToOneRelation,
    //     join: { from: 'brands.owner_id', to: 'users.id' }
    // })
    // owner_id: Users[];
}