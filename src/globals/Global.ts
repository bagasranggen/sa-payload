import { GlobalConfig } from 'payload';
import { BaseLink } from '@/shared';

export const Global: GlobalConfig = {
    slug: 'global',
    admin: {
        group: 'Settings',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Address',
                    fields: [
                        {
                            type: 'text',
                            name: 'locationTitle',
                        },
                        {
                            type: 'textarea',
                            name: 'locationAddress',
                        },
                        BaseLink({ name: 'locationLink', label: 'Link' }),
                    ],
                },
            ],
        },
    ],
};
