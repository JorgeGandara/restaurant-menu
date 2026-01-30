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
            title: 'WhatsApp URL',
            type: 'url',
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
        defineField({
            name: 'imagen_del_restaurante',
            title: 'Imagen del Restaurante',
            type: 'image',
        }),
        defineField({
            name: 'backgroundImage',
            title: 'Imagen de Fondo',
            type: 'image',
            options: {
                hotspot: true, 
            },
            description: 'Sube una imagen para usar como fondo de pantalla.',
        }),
        defineField({
            name: 'googleMapsUrl',
            title: 'URL de Google Maps',
            type: 'url',
        }),
        defineField({
            name: 'videoHowToArrive',
            title: 'Video de Cómo Llegar',
            type: 'object',
            fields: [
                defineField({
                    name: 'source',
                    title: 'Fuente del video',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Subir archivo', value: 'file' },
                            { title: 'URL externa (YouTube / Vimeo)', value: 'url' },
                        ],
                        layout: 'radio',
                    },
                    initialValue: 'file',
                }),

                defineField({
                    name: 'videoFile',
                    title: 'Archivo de video',
                    type: 'file',
                    options: {
                        accept: 'video/*',
                    },
                    hidden: ({ parent }) => parent?.source !== 'file',
                }),

                defineField({
                    name: 'videoUrl',
                    title: 'URL del video',
                    type: 'url',
                    hidden: ({ parent }) => parent?.source !== 'url',
                }),
            ],
        }),
        defineField({
            name: 'typography',
            title: 'Tipografía del Documento',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: false,
            },
            fields: [
                defineField({
                    name: "fontFamily",
                    title: "Familia tipográfica",
                    type: "string",
                    options: {
                        list: [
                        { title: "Montserrat", value: "var(--font-montserrat)" },
                        { title: "Playfair Display", value: "var(--font-playfair)" },
                        { title: "Faith", value: "var(--font-faith)" },
                        ],
                    },
                    initialValue: "var(--font-montserrat)",
                }),

                defineField({
                    name: 'fontSize',
                    title: 'Tamaño base',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Pequeño (14px)', value: '14px' },
                            { title: 'Normal (16px)', value: '16px' },
                            { title: 'Grande (18px)', value: '18px' },
                        ],
                    },
                    initialValue: '16px',
                }),

                defineField({
                    name: 'fontWeight',
                    title: 'Peso',
                    type: 'number',
                    options: {
                        list: [
                            { title: 'Light', value: 300 },
                            { title: 'Regular', value: 400 },
                            { title: 'Medium', value: 500 },
                            { title: 'Bold', value: 700 },
                        ],
                    },
                    initialValue: 400,
                }),
            ],
        }),
    ],
});
