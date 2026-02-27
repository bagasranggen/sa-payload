import { Tab } from 'payload';

import { ArrayStringTypes } from '@/libs/types';
import { joinArrayString } from '@/libs/utils';

import slugify from 'slugify';

export type BaseEntryGeneralProps = {
    enabled?: boolean;
};

export const BaseEntryGeneral = ({ enabled = true }: BaseEntryGeneralProps): Tab => {
    return {
        label: 'General',
        fields: [
            {
                type: 'text',
                name: 'title',
                required: true,
            },
            {
                type: 'row',
                admin: {
                    hidden: !enabled,
                },
                fields: [
                    {
                        type: 'text',
                        name: 'url',
                        label: 'URL',
                        admin: {
                            readOnly: true,
                            width: '50%',
                        },
                        hooks: {
                            beforeChange: [
                                ({ siblingData }) => {
                                    let slug = undefined;
                                    if (siblingData?.title) slug = siblingData.title;
                                    if (siblingData?.slug) slug = siblingData.slug;
                                    if (slug) slug = slugify(slug, { lower: true });

                                    let url: ArrayStringTypes = [];
                                    if (process.env.BASE_URI) url.push(process.env.BASE_URI);
                                    if (slug) url.push(slug);
                                    url = joinArrayString(url, '/');

                                    if (url) return url;
                                },
                            ],
                        },
                    },
                    {
                        type: 'text',
                        name: 'uri',
                        label: 'URI',
                        admin: {
                            readOnly: true,
                            width: '50%',
                        },
                        hooks: {
                            beforeChange: [
                                ({ siblingData }) => {
                                    let slug = undefined;
                                    if (siblingData?.title) slug = siblingData.title;
                                    if (siblingData?.slug) slug = siblingData.slug;
                                    if (slug) slug = slugify(slug, { lower: true });

                                    let url: ArrayStringTypes = [];
                                    if (slug) url.push(slug);
                                    url = joinArrayString(url, '/');

                                    if (url) return url;
                                },
                            ],
                        },
                    },
                ],
            },
        ],
    };
};
