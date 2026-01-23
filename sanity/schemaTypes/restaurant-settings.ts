import { defineField, defineType } from 'sanity';

export const restaurantSettings = defineType({
    name: 'restaurantSettings',
    title: 'Configuración del Restaurante',
    type: 'document',
    fields: [
        defineField({
            name: 'restaurant',
            title: 'Restaurante',
            type: 'reference',
            to: [{ type: 'restaurant' }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'name',
            title: 'Nombre del Restaurante',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Descripción Corta',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'address',
            title: 'Dirección',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Teléfono',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Correo Electrónico',
            type: 'string',
        }),
        defineField({
            name: 'instagram',
            title: 'Instagram URL',
            type: 'url',
        }),
        defineField({
            name: 'facebook',
            title: 'Facebook URL',
            type: 'url',
        }),
        defineField({
            name: 'whatsapp',
            title: 'WhatsApp (Número o Link)',
            type: 'string',
        }),
        defineField({
            name: 'adminKey',
            title: 'Clave de Administrador',
            description: 'Clave para acceder al panel de administración',
            type: 'string',
            hidden: false,
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
        }),
    ],
});
