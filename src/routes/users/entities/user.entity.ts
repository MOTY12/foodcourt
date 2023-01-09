import { Table, Column, columnTypes, Model } from "nestjs-objection";


@Table({ tableName: "users" })
export class Users extends Model {
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


    @Column({
        type: columnTypes.string,
        notNullable: true
    })
    email: string;

    @Column({
        type: columnTypes.string,
        notNullable: true
    })
    password: string;

    @Column({
        type: columnTypes.string,
        notNullable: true,
        default: 'user'
    })
    role: string;

    @Column({
        type: columnTypes.string,
        notNullable: true,
        default: 'false'
    })
    isDeleted: string;


    @Column({
        type: columnTypes.datetime,
    })
    created_at: Date;

    @Column({
        type: columnTypes.datetime,
    })
    updated_at: Date;

    @Column({
        type: columnTypes.datetime,
    })
    deleted_at: Date;
}