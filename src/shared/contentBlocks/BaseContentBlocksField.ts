import { Block, Tab, TabsField } from 'payload';

import { ContentBlocksSettings } from '@/shared/contentBlocks/ContentBlocksSettings';

export type BaseContentBlocksFieldProps = Pick<TabsField, 'tabs'>;

export const BaseContentBlocksField = (props?: BaseContentBlocksFieldProps): Block['fields'] => {
    const tabs: Tab[] = [];

    if (props?.tabs && props.tabs.length > 0) tabs.push(...props.tabs);
    tabs.push(ContentBlocksSettings());

    return [
        {
            type: 'tabs',
            tabs,
        },
    ];
};
