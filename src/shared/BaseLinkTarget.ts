import { AdminClient, Field, Condition, CheckboxField } from 'payload';

export type BaseTargetProps = {
    // condition?: Condition;
} & Partial<Pick<CheckboxField, 'name' | 'admin'>>;

// export const BaseLinkTarget = ({ name = 'target', ...props }: BaseTargetProps): Field => ({
export const BaseLinkTarget = (props: BaseTargetProps): Field => ({
    type: 'checkbox',
    name: props?.name ?? 'target',
    label: 'Open in new tab',
    // admin: {
    //     // ...props,
    // },
    ...(props?.admin ? { admin: props.admin } : {}),
});
