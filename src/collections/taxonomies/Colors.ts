import { CollectionConfig } from 'payload';

import { colorPickerField } from '@innovixx/payload-color-picker-field';

import { BaseEntry } from '@/collections/shared';

export const Colors: CollectionConfig = {
    slug: 'color',
    admin: {
        group: 'Taxonomies',
        useAsTitle: 'title',
    },
    fields: BaseEntry({
        typeHandle: 'sectionTaxonomiesColors',
        tabs: [
            {
                label: 'Content',
                fields: [
                    colorPickerField({
                        name: 'color',
                    }),
                ],
            },
        ],
    }),
};
