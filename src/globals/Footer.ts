import { GlobalConfig } from 'payload';
import { BaseEntryStatus, BaseLink } from '@/shared';

export const Footer: GlobalConfig = {
    slug: 'footer',
    admin: {
        group: 'Navigation',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'General Info',
                    fields: [
                        {
                            type: 'array',
                            name: 'generalInfo',
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        BaseEntryStatus({
                                            admin: { width: '15%' },
                                        }),
                                    ],
                                },
                                BaseLink(),
                            ],
                        },
                    ],
                },
                {
                    label: 'Social Media',
                    fields: [
                        {
                            type: 'array',
                            name: 'socials',
                            label: 'Social Media',
                            labels: {
                                singular: 'Social Media',
                                plural: 'Social Media',
                            },
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        BaseEntryStatus({
                                            admin: { width: '15%' },
                                        }),
                                    ],
                                },
                                BaseLink(),
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};
