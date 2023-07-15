import { Story, Meta } from '@storybook/react';
import URLList, { URLListProps } from './';

export default {
  title: 'URLList',
  component: URLList,
} as Meta;

const Template: Story<URLListProps> = (args) => <URLList {...args} />;

export const Default = Template.bind({});
Default.args = {
  urls: [
    { shortUrl: 'https://shrt.co/abc', originalUrl: 'https://example.com' },
    { shortUrl: 'https://shrt.co/def', originalUrl: 'https://google.com' },
  ],
  onItemClick: (url: string) => {
    console.log('Clicked URL:', url);
  },
};
