
exports.up = async function(knex) {
      await knex.schema.createTable("users", (table) => {
          table.increments("id")
          table.text("username").notNull().unique()
          table.text("phoneNumber")
          table.text("password").notNull()
      })
    
      await knex.schema.createTable("species", (table) => {
          table.increments("id")
          table.text("name").notNull().unique()
      })
    
      await knex.schema.createTable("plants", (table) => {
          table.increments("id")
          table.text("nickname").notNull()
          table.text("water").notNull()
          table
           .integer("species_id")
           .references("id")
           .inTable("species")
           // set a reference option so that when the primary key 
           // that it's pointing at gets deleted, set the value of this FK to null.
           .onDelete("SET NULL")
      })
    
      await knex.schema.createTable("users_plants", (table) => {
          table.integer("user_id")
           .notNull()
           .references("id")
           .inTable("users")
           .onDelete("CASCADE")
           .onUpdate("CASCADE")
          table.integer("plant_id")
           .notNull()
           .references("id")
           .inTable("plants")
           .onDelete("CASCADE")
           .onUpdate("CASCADE")
          // make the primary key a combination of two columns, so you can only have one
          // unique combination of each value.
          table.primary(["user_id", "plant_id"])
      })
    
    }
    
    exports.down = async function(knex) {
        await knex.schema.dropTableIfExists("users_plants")
        await knex.schema.dropTableIfExists("plants")
        await knex.schema.dropTableIfExists("species")
        await knex.schema.dropTableIfExists("users")
    }
