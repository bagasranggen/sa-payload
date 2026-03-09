import { BlocksField, Field } from 'payload';

import { ContentBlocksLabelContent } from '@/shared/contentBlocks/ContentBlocksLabelContent';

export type ContentBlocksProps = {} & Pick<BlocksField, 'name'>;

export const ContentBlocks = (props?: ContentBlocksProps): Field => {
    return {
        type: 'blocks',
        name: props?.name ?? 'contentBlocks',
        // interfaceName: 'ContentBlock',
        // fields: [
        //
        // ],
        blocks: [ContentBlocksLabelContent],
    };
};
