import { Field, CheckboxField } from 'payload';

export type BaseTargetProps = Partial<Pick<CheckboxField, 'name' | 'admin'>>;

export const BaseLinkTarget = (props: BaseTargetProps): Field => ({
    type: 'checkbox',
    name: props?.name ?? 'target',
    label: 'Open in new tab',
    ...(props?.admin ? { admin: props.admin } : {}),
});
