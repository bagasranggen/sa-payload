import { Block } from 'payload';

export const ContentBlocksLabelContent: Block = {
    slug: 'labelContent',
    interfaceName: 'ContentBlockLabelContent',
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
};
