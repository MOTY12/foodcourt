import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('role').notNullable().defaultTo('user');
        table.string('password').notNullable();
        table.string('isDeleted').notNullable().defaultTo('false');
        table.timestamps(true, true);
    })

    .createTable('brands', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('userId').notNullable().references('id').inTable('users');
        table.string('isDeleted').notNullable().defaultTo('false');
        table.timestamps(true, true);
    })
    
    .createTable('Addon', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.integer('price').notNullable();
        table.integer('category').notNullable();
        table.integer('userId').notNullable().references('id').inTable('users');
        table.integer('brand_id').notNullable().references('id').inTable('brands');
        table.string('isDeleted').notNullable().defaultTo('false');
        table.timestamps(true, true);``
    })
    .createTable('AddonCategory', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('isDeleted').notNullable().defaultTo('false');
        table.integer('userId').notNullable().references('id').inTable('users');
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTableIfExists('Addon')
    .dropTableIfExists('AddonCategory')
    .dropTableIfExists('brands')
    .dropTableIfExists('users')
}

