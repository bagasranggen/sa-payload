import { GlobalConfig } from 'payload';

import { PAGES_TYPE_HANDLES, PAGES_TYPE_OPTIONS_HANDLES } from '@/libs/constants';

import { BaseEntry } from '@/shared';

export const Homepage: GlobalConfig = {
    slug: 'homepage',
    admin: {
        group: 'Pages',
    },
    fields: BaseEntry({
        typeHandle: [PAGES_TYPE_OPTIONS_HANDLES[PAGES_TYPE_HANDLES.HOMEPAGE]],
        url: {
            withSlug: () => false,
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
                        type: 'text',
                        name: 'collectionTitle',
                        label: 'Title',
                    },
                    {
                        type: 'relationship',
                        name: 'collections',
                        relationTo: 'pages',
                        hasMany: true,
                    },
                ],
            },
        ],
    }),
};
