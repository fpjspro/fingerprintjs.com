import React from 'react'
import { Story } from '@storybook/react'
import Header, { HeaderProps } from './Header'

export default {
  title: 'Widgets / Study Case ',
  component: Header,
}

const Template: Story<HeaderProps> = (args) => <Header {...args} />

export const HeaderStory = Template.bind({})
HeaderStory.args = {
  subLabel: 'Cras pellentesque arcu eu ligula tristique lacinia.',
  subTitle: 'ligula tristique',
  description:
    'Curabitur sit amet vestibulum ex. Aenean et purus fermentum, accumsan ante vel, sollicitudin odio. Praesent ut nunc tortor. Pellentesque cursus ante et augue convallis malesuada.',
  pdfLink: '/',
}
