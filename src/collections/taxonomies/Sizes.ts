import { CollectionConfig } from 'payload';

import { BaseEntry } from '@/shared';

export const Sizes: CollectionConfig = {
    slug: 'sizes',
    admin: {
        group: 'Taxonomies',
        useAsTitle: 'title',
    },
    fields: BaseEntry({
        typeHandle: 'sectionTaxonomiesSizes',
        url: { enabled: false },
        tabs: [],
    }),
};
