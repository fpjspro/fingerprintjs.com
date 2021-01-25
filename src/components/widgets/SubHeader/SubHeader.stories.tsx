import React from 'react'
import { Story } from '@storybook/react'
import SubHeader, { SubHeaderProps } from './index'

export default {
  title: 'Widgets / SubHeader',
  component: SubHeader,

  excludeStories: /.*Args/,
}

const Template: Story<SubHeaderProps> = (args) => <SubHeader {...args} />

export const Default = Template.bind({})
export const defaultArgs: SubHeaderProps = {
  title: 'Vestibulum maximus varius vulputate.',
  subtitle: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
}
Default.args = defaultArgs
