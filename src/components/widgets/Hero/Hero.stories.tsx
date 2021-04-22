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
  title: 'Cras pellentesque arcu eu ligula tristique lacinia.',
  description:
    'Curabitur sit amet vestibulum ex. Aenean et purus fermentum, accumsan ante vel, sollicitudin odio. Praesent ut nunc tortor. Pellentesque cursus ante et augue convallis malesuada.',
  ctaText: 'Action',
  ctaHref: '/',
  openCtaNewTab: false,
}
