import React from 'react'
import SubHeader from './index'

export default {
  title: 'Widgets / SubHeader',
  component: SubHeader,
}

const Template = (args) => <SubHeader {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Vestibulum maximus varius vulputate.',
}

export const WithSubtitle = Template.bind({})
WithSubtitle.args = {
  title: 'Vestibulum maximus varius vulputate.',
  subtitle: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
}
