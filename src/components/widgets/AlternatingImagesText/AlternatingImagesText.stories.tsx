import React from 'react'
import { Story } from '@storybook/react'
import AlternatingImagesText, { AlternatingImagesTextProps } from './index'

export default {
  title: 'Widgets / AlternatingImagesText',
  component: AlternatingImagesText,
}

const Template: Story<AlternatingImagesTextProps> = (args) => <AlternatingImagesText {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'In ornare imperdiet nisl, eu tempor massa blandit in.',
  blocks: [
    {
      image: 'https://picsum.photos/500',
      subTitle: 'Donec maximus sit amet neque a feugiat.',
      content:
        'Fusce convallis euismod eros at aliquet. Fusce vitae varius erat. Quisque tellus nulla, tincidunt vel auctor a, commodo ut augue. Nulla sollicitudin fringilla tellus ut pulvinar. Ut et euismod lacus, sit amet fringilla diam. Integer posuere ut velit ut faucibus. Maecenas elementum mauris ante, sit amet commodo leo suscipit vitae.',
      isImageAfterText: false,
      ctaUrl: '/',
      ctaText: 'Action',
      isCtaButton: false,
    },
    {
      image: 'https://picsum.photos/500',
      subTitle: 'Nullam posuere sed dolor a dignissim.',
      content:
        'Donec aliquet euismod sapien, eget tincidunt dolor vehicula bibendum. Praesent sed libero metus. Aliquam et enim at ipsum efficitur semper nec mattis ligula. Cras vulputate sapien et diam blandit porta. Sed faucibus nibh et felis luctus commodo. Maecenas orci ante, pellentesque eget est sit amet, accumsan volutpat libero. Sed gravida pulvinar malesuada. Aenean feugiat dolor nec tortor porta tincidunt. Nulla ut ullamcorper metus.',
      isImageAfterText: true,
      ctaText: 'Action',
      ctaUrl: '/',
      isCtaButton: true,
    },
  ],
}
