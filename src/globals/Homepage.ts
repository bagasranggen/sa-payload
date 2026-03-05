import { GlobalConfig } from 'payload';

import { BaseEntry } from '@/shared';

export const Homepage: GlobalConfig = {
    slug: 'homepage',
    admin: {
        group: 'Pages',
    },
    fields: BaseEntry({
        typeHandle: 'sectionHomepage',
        url: {
            withSlug: false,
            additionalPath: async () => {
                return ['__home__'];
            },
        },
        tabs: [
            {
                label: 'Banner',
                fields: [
                    {
                        type: 'text',
                        name: 'bannerTitle',
                        label: 'Title',
                    },
                    {
                        type: 'richText',
                        name: 'bannerSubTitle',
                        label: 'Sub Title',
                    },
                ],
            },
            {
                label: 'Highlight',
                fields: [
                    {
                        type: 'relationship',
                        name: 'highlights',
                        relationTo: 'products',
                        hasMany: true,
                    },
                ],
            },
            {
                label: 'Collections',
                fields: [
                    {
                        type: 'relationship',
                        name: 'collections',
                        relationTo: 'productsCategories',
                        hasMany: true,
                    },
                ],
            },
        ],
    }),
};
