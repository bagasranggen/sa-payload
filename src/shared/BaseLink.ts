import { NamedGroupField, Field } from 'payload';

import { BaseLinkTarget } from '@/shared/BaseLinkTarget';

export type BaseLinkProps = Pick<NamedGroupField, 'name' | 'label'>;

export const BaseLink = (props?: BaseLinkProps): Field => {
    return {
        type: 'group',
        name: props?.name ?? 'link',
        label: props?.label,
        interfaceName: 'Link',
        fields: [
            {
                type: 'row',
                fields: [
                    {
                        type: 'select',
                        name: 'source',
                        label: false,
                        admin: {
                            placeholder: 'Select link source',
                            width: '25%',
                        },
                        options: [
                            { value: 'categories', label: 'Categories' },
                            { value: 'custom', label: 'Custom' },
                            { value: 'mail', label: 'Mail' },
                            { value: 'products', label: 'Products' },
                            { value: 'pages', label: 'Pages' },
                            // { value: 'whatsapp', label: 'Whatsapp' },
                        ],
                    },
                    {
                        type: 'relationship',
                        name: 'category',
                        label: false,
                        relationTo: 'productsCategories',
                        required: true,
                        admin: {
                            condition: (data, siblingData) => siblingData?.source === 'categories',
                        },
                    },
                    {
                        type: 'text',
                        name: 'custom',
                        label: false,
                        required: true,
                        admin: {
                            condition: (data, siblingData) => siblingData?.source === 'custom',
                            placeholder: 'Type your custom URL (ex. https://www.sookabakedgoods.com/)',
                        },
                    },
                    {
                        type: 'text',
                        name: 'mail',
                        label: false,
                        required: true,
                        admin: {
                            condition: (data, siblingData) => siblingData?.source === 'mail',
                            placeholder: 'Type your email address (ex. example@example.com)',
                        },
                    },
                    {
                        type: 'relationship',
                        name: 'product',
                        label: false,
                        relationTo: 'products',
                        required: true,
                        admin: {
                            condition: (data, siblingData) => siblingData?.source === 'products',
                        },
                    },
                    {
                        type: 'relationship',
                        name: 'page',
                        label: false,
                        relationTo: 'staticPages',
                        required: true,
                        admin: {
                            condition: (data, siblingData) => siblingData?.source === 'pages',
                        },
                    },
                    BaseLinkTarget({
                        admin: {
                            condition: (data, siblingData) => siblingData?.source,
                            width: '15%',
                            style: { display: 'flex', flexDirection: 'column', justifyContent: 'center' },
                        },
                    }),
                ],
            },
            {
                type: 'text',
                name: 'label',
                admin: {
                    condition: (data, siblingData) => siblingData?.source,
                },
            },
        ],
    };
};
