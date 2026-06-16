import { Block } from 'payload';

import { BaseContentBlocksField } from '@/shared/contentBlocks/BaseContentBlocksField';

export const ContentBlocksLabelContent: Block = {
    slug: 'labelContent',
    interfaceName: 'CbLabelContent',
    fields: BaseContentBlocksField({
        tabs: [
            {
                label: 'Content',
                fields: [
                    {
                        type: 'text',
                        name: 'heading',
                        required: true,
                    },
                    {
                        type: 'richText',
                        name: 'content',
                    },
                ],
            },
        ],
    }),
};
