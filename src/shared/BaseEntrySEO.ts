import { CollectionSlug, Field, Tab } from 'payload';

import { MetaTitleField, MetaDescriptionField, MetaImageField, PreviewField } from '@payloadcms/plugin-seo/fields';

export type BaseEntrySEOProps = {
    mediaRelation?: CollectionSlug;
};

export const BaseEntrySEO = (props?: BaseEntrySEOProps): Tab => {
    const fields: Field[] = [
        MetaTitleField({
            // if the `generateTitle` function is configured
            hasGenerateFn: true,
        }),
        MetaDescriptionField({
            // if the `generateDescription` function is configured
            hasGenerateFn: true,
        }),
    ];

    if (props?.mediaRelation) {
        fields.push(
            MetaImageField({
                // if the `generateDescription` function is configured
                // hasGenerateFn: true,
                relationTo: props.mediaRelation,
            })
        );
    }

    fields.push(
        PreviewField({
            // if the `generateUrl` function is configured
            hasGenerateFn: true,

            // field paths to match the target field for data
            titlePath: 'meta.title',
            descriptionPath: 'meta.description',
        })
        //     // OverviewField({
        //     //     // field paths to match the target field for data
        //     //     titlePath: 'meta.title',
        //     //     descriptionPath: 'meta.description',
        //     //     // imagePath: 'meta.image',
        //     // }),
    );

    return {
        label: 'SEO',
        fields: [
            {
                type: 'group',
                interfaceName: 'Meta',
                name: 'meta',
                label: '',
                fields,
            },
        ],
    };
};
