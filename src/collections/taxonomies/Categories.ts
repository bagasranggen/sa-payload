import { CollectionConfig } from 'payload';
import { BaseEntry } from '@/shared';

export const Categories: CollectionConfig = {
    slug: 'categories',

    admin: {
        group: 'Taxonomies',
        useAsTitle: 'title',
    },
    fields: BaseEntry({
        typeHandle: 'sectionTaxonomiesCategories',
        url: { enabled: false },
    }),
};
