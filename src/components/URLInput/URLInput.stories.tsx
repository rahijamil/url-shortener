import { Story, Meta } from "@storybook/react";
import URLInput from ".";

export default {
  title: "Components/URLInput",
  component: URLInput,
  argTypes: {
    onSubmit: { action: "submitted" },
  },
} as Meta;

const Template: Story<{ onSubmit: (value: string) => void }> = (args) => (
  <URLInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: (value) => console.log(value),
};
