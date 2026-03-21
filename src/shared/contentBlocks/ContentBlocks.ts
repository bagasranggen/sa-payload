import { BlocksField, Field } from 'payload';

import { ContentBlocksLabelContent } from '@/shared/contentBlocks/ContentBlocksLabelContent';

export type ContentBlocksProps = Pick<BlocksField, 'name'>;

export const ContentBlocks = (props?: ContentBlocksProps): Field => {
    return {
        type: 'group',
        label: '',
        name: props?.name ?? 'contentBlocks',
        interfaceName: 'ContentBlocks',
        fields: [
            {
                type: 'blocks',
                name: 'blocks',
                blocks: [ContentBlocksLabelContent],
            },
        ],
    };
};
