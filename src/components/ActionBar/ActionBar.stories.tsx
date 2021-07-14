import React from 'react'
import { Story } from '@storybook/react'
import ActionBar, { ActionBarProps } from './ActionBar'

export default {
  title: 'Components / ActionBar',
  component: ActionBar,
}

const Template: Story<ActionBarProps> = (args) => <ActionBar {...args} />

export const ActionBarStory = Template.bind({})
ActionBarStory.args = {
  publishDate: 'June 24,2021',
}
