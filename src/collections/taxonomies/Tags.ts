import { CollectionConfig } from 'payload';

import { BaseEntry } from '@/shared';

export const Tags: CollectionConfig = {
    slug: 'tags',

    admin: {
        group: 'Taxonomies',
        useAsTitle: 'title',
    },
    fields: BaseEntry({
        typeHandle: 'sectionTaxonomiesTags',
        url: { enabled: false },
        tabs: [],
    }),
};
