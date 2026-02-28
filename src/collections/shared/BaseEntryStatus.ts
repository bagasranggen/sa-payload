import { Field } from 'payload';

import slugify from 'slugify';

export type BaseEntryStatusProps = {
    typeHandle?: string;
};

export const BaseEntryStatus = ({ typeHandle }: BaseEntryStatusProps): Field => {
    const fields: Field[] = [];

    if (typeHandle) {
        fields.push({
            type: 'text',
            name: 'typeHandle',
            label: 'Type',
            defaultValue: typeHandle,
            required: true,
            admin: {
                readOnly: true,
            },
        });
    }

    fields.push({
        type: 'text',
        name: 'slug',
        unique: true,
        required: true,
        hooks: {
            beforeChange: [
                ({ siblingData, value }) => {
                    let slug = undefined;
                    if (!siblingData?.createdAt && siblingData?.title && !value) slug = siblingData.title;
                    if (!slug && value) slug = value;

                    if (slug) return slugify(slug, { lower: true });
                },
            ],
        },
    });

    fields.push({
        type: 'select',
        name: 'entryStatus',
        label: 'Status',
        defaultValue: 'live',
        required: true,
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
    });

    return {
        type: 'group',
        admin: {
            position: 'sidebar',
        },
        fields,
        // fields: [
        //     {
        //         type: 'text',
        //         name: 'typeHandle',
        //         label: 'Type',
        //         defaultValue: typeHandle,
        //         admin: {
        //             readOnly: true,
        //             hidden: !typeHandle,
        //         },
        //     },
        //     {
        //         type: 'text',
        //         name: 'slug',
        //         unique: true,
        //         required: true,
        //         hooks: {
        //             beforeChange: [
        //                 ({ siblingData, value }) => {
        //                     let slug = undefined;
        //                     if (!siblingData?.createdAt && siblingData?.title && !value) slug = siblingData.title;
        //                     if (!slug && value) slug = value;
        //
        //                     if (slug) return slugify(slug, { lower: true });
        //                 },
        //             ],
        //         },
        //     },
        //     {
        //         type: 'select',
        //         name: 'entryStatus',
        //         label: 'Status',
        //         defaultValue: 'live',
        //         options: [
        //             {
        //                 value: 'disabled',
        //                 label: 'Disabled',
        //             },
        //             {
        //                 value: 'live',
        //                 label: 'Live',
        //             },
        //         ],
        //     },
        // ],
    };
};
