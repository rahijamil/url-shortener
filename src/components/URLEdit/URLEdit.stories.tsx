import { Story, Meta } from '@storybook/react';
import URLEdit, { URLEditProps } from './';

export default {
  title: 'URLEdit',
  component: URLEdit,
} as Meta;

const Template: Story<URLEditProps> = (args) => <URLEdit {...args} />;

export const Default = Template.bind({});
Default.args = {
  originalUrl: 'https://example.com',
  onSave: (url: string) => {
    console.log('Save URL:', url);
  },
  onDelete: () => {
    console.log('Delete URL');
  },
};
