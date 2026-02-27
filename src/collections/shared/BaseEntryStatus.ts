import { Field } from 'payload';

import slugify from 'slugify';

export type BaseEntryStatusProps = {
    typeHandle?: string;
};

export const BaseEntryStatus = ({ typeHandle }: BaseEntryStatusProps): Field => {
    return {
        type: 'group',
        admin: {
            position: 'sidebar',
        },
        fields: [
            {
                type: 'text',
                name: 'typeHandle',
                label: 'Type',
                defaultValue: 'sectionTaxonomiesColors',
                admin: {
                    readOnly: true,
                    hidden: !typeHandle,
                },
            },
            {
                type: 'text',
                name: 'slug',
                hooks: {
                    beforeChange: [
                        ({ siblingData, value }) => {
                            let slug = undefined;
                            if (!siblingData?.createdAt && siblingData?.title) slug = siblingData.title;
                            if (!slug && value) slug = value;

                            if (slug) return slugify(slug, { lower: true });
                        },
                    ],
                },
            },
            {
                type: 'select',
                name: 'entryStatus',
                label: 'Status',
                defaultValue: 'live',
                options: [
                    {
                        value: 'disabled',
                        label: 'Disabled',
                    },
                    {
                        value: 'live',
                        label: 'Live',
                    },
                ],
            },
        ],
    };
};
