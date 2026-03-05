import { CollectionConfig } from 'payload';

import { BaseEntry } from '@/shared';

export const StaticPages: CollectionConfig = {
    slug: 'staticPages',
    admin: {
        group: 'Pages',
        useAsTitle: 'title',
    },
    fields: BaseEntry({
        typeHandle: 'sectionStaticPages',
        tabs: [],
    }),
};
