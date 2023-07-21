import { Story, Meta } from "@storybook/react";
import URLList, { URLListProps } from "./";

export default {
  title: "URLList",
  component: URLList,
} as Meta;

const Template: Story<URLListProps> = (args) => <URLList {...args} />;

export const Default = Template.bind({});
Default.args = {
  onItemClick: (url: string) => {
    console.log("Clicked URL:", url);
  },
};
