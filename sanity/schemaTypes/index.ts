import { type SchemaTypeDefinition } from 'sanity'
import plateSchema from './plate-schema'
import categorySchema from './category-schema'
import { restaurantSettings } from './restaurant-settings'
import { restaurantSchema } from './restaurant'

export const schemas: { types: SchemaTypeDefinition[] } = {
  types: [restaurantSchema, plateSchema, categorySchema, restaurantSettings],
}
