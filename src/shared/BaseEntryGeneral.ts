import { Field, Tab } from 'payload';

import { getUrlPath, GetUrlPathProps } from '@/libs/utils';

export type BaseEntryGeneralProps = {
    enabled?: boolean;
} & Pick<GetUrlPathProps, 'additionalPath' | 'withSlug'>;

export const BaseEntryGeneral = ({ enabled = true, additionalPath, withSlug }: BaseEntryGeneralProps): Tab => {
    const fields: Field[] = [];

    fields.push({
        type: 'text',
        name: 'title',
        required: true,
    });

    if (enabled) {
        fields.push({
            type: 'row',
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
                            async ({ siblingData, req }) => {
                                const url = await getUrlPath({
                                    siblingData,
                                    req,
                                    additionalPath,
                                    withBaseUri: true,
                                    withSlug,
                                });

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
                            async ({ siblingData, req }) => {
                                const url = await getUrlPath({ siblingData, req, additionalPath, withSlug });

                                if (url) return url;
                            },
                        ],
                    },
                },
            ],
        });
    }

    return {
        label: 'General',
        fields,
    };
};
