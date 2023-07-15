import { Story, Meta } from '@storybook/react';
import ShortURLDisplay from '.';

export default {
  title: 'ShortURLDisplay',
  component: ShortURLDisplay,
} as Meta;

const Template: Story<{ shortUrl: string }> = (args) => <ShortURLDisplay {...args} />;

export const Default = Template.bind({});
Default.args = {
  shortUrl: 'https://shrt.co/xyz',
};