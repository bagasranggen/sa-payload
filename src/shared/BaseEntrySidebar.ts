import { Field, Option } from 'payload';

import slugify from 'slugify';

import { BaseEntryStatus } from '@/shared/BaseEntryStatus';

export type TypeHandleOptionItem = Exclude<Option, string>;

export type BaseEntrySidebarProps = {
    typeHandle?: string | TypeHandleOptionItem[];
};

export const BaseEntrySidebar = ({ typeHandle }: BaseEntrySidebarProps): Field => {
    const fields: Field[] = [];

    if (typeHandle && Array.isArray(typeHandle)) {
        const isSingle = typeHandle.length === 1;

        fields.push({
            type: 'select',
            name: 'typeHandle',
            label: 'Type',
            options: typeHandle,
            defaultValue: isSingle ? typeHandle[0].value : undefined,
            required: true,
            admin: {
                readOnly: isSingle,
            },
        });
    }

    if (typeHandle && !Array.isArray(typeHandle)) {
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

    fields.push(BaseEntryStatus());

    return {
        type: 'group',
        admin: {
            position: 'sidebar',
        },
        fields,
    };
};
