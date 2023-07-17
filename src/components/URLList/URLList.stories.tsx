import { Story, Meta } from "@storybook/react";
import URLList, { URLListProps } from "./";

export default {
  title: "URLList",
  component: URLList,
} as Meta;

const Template: Story<URLListProps> = (args) => <URLList {...args} />;

export const Default = Template.bind({});
Default.args = {
  urls: [
    {
      id: "abc",
      shortURL: "https://shrt.co/abc",
      longURL: "https://example.com",
    },
    {
      id: "def",
      shortURL: "https://shrt.co/def",
      longURL: "https://google.com",
    },
  ],
  onItemClick: (url: string) => {
    console.log("Clicked URL:", url);
  },
};
