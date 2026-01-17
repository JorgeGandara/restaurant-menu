import { type SchemaTypeDefinition } from 'sanity'
import plateSchema from './plate-schema'
import { restaurantSettings } from './restaurant-settings'

export const schemas: { types: SchemaTypeDefinition[] } = {
  types: [plateSchema, restaurantSettings],
}
