import { CollectionConfig } from 'payload';
import { BaseEntry } from '@/shared';

export const Labels: CollectionConfig = {
    slug: 'labels',

    admin: {
        group: 'Taxonomies',
        useAsTitle: 'title',
    },
    fields: BaseEntry({
        typeHandle: 'sectionTaxonomiesLabels',
        url: { enabled: false },
        tabs: [],
    }),
};
