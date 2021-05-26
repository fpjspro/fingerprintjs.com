import React from 'react'
import { Story } from '@storybook/react'
import HeaderBar, { headerBarProps } from './HeaderBar'

export default {
  title: 'Components / HeaderBar',
  component: HeaderBar,
}

const Template: Story<headerBarProps> = (args) => <HeaderBar {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Curabitur sit amet vestibulum ex.',
  linkText: '>>>',
  linkUrl: '/',
}
