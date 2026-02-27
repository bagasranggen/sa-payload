import { CollectionConfig } from 'payload';
import { BaseEntry } from '@/collections/shared';

export const Sizes: CollectionConfig = {
    slug: 'sizes',

    admin: {
        group: 'Taxonomies',
        useAsTitle: 'title',
    },
    fields: BaseEntry({
        typeHandle: 'sectionTaxonomiesSizes',
        url: { enabled: false },
        tabs: [
            // {
            //     label: 'C',
            //     fields: [
            //         {
            //             type: 'date',
            //             name: 'date',
            //             admin: {
            //                 date: {
            //                     minDate: new Date(),
            //                 },
            //             },
            //         },
            //     ],
            // },
        ],
    }),
};
