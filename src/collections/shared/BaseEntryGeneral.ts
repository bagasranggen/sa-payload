import { Field, FieldHookArgs, Tab, TypeWithID } from 'payload';

import { getUrlPath } from '@/libs/utils';

export type AdditionalPathArg = Pick<FieldHookArgs<TypeWithID, any, any>, 'siblingData' | 'req'>;

export type BaseEntryGeneralProps = {
    enabled?: boolean;
    additionalPath?: (props: AdditionalPathArg) => Promise<string[]>;
};

export const BaseEntryGeneral = ({ enabled = true, additionalPath }: BaseEntryGeneralProps): Tab => {
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
                                const url = await getUrlPath({ siblingData, req, additionalPath, withBaseUri: true });

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
                                const url = await getUrlPath({ siblingData, req, additionalPath });

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
