import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navigation from ".";

export default {
  title: "Components/Navigation",
  component: Navigation,
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = (args) => <Navigation />;

export const Primary = Template.bind({});
Primary.args = {};

