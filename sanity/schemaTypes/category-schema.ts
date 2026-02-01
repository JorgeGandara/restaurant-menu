export default {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
        {
            name: 'restaurant',
            title: 'Restaurante',
            type: 'reference',
            to: [{ type: 'restaurant' }],
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
    ],
}
