import React from 'react'
import { Story } from '@storybook/react'
import Hero, { HeroProps } from './index'

export default {
  title: 'Widgets / Hero',
  component: Hero,
}

const Template: Story<HeroProps> = (args) => <Hero {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Vestibulum maximus varius vulputate.',
  description: 'Some description',
  ctaHref: 'https://example.com',
  ctaText: 'Click Me!',
}
