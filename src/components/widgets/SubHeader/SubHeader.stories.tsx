import React from 'react'
import { Story } from '@storybook/react'
import SubHeader, { SubHeaderProps } from './index'

export default {
  title: 'Widgets / SubHeader',
  component: SubHeader,
}

const Template: Story<SubHeaderProps> = (args) => <SubHeader {...args} />

export const Default = Template.bind({})
Default.args = {
  title: { text: 'Vestibulum maximus varius vulputate.' },
  subtitle: { text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.' },
}
