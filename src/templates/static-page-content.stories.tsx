import React from 'react'
import { Story } from '@storybook/react'
import { StaticPageContentTemplate, StaticPageContentTemplateProps } from './static-page-content'
import { defaultArgs as ctaArgs } from '../components/widgets/InlineCta/InlineCta.stories'
import { defaultArgs as cardSectionArgs } from '../components/widgets/CardSection/CardSection.stories'
import { defaultArgs as blocksArgs } from '../components/widgets/AlternatingImagesText/AlternatingImagesText.stories'
import { defaultArgs as heroArgs } from '../components/widgets/Hero/Hero.stories'

export default {
  title: 'Pages / Static Page Content',
  component: StaticPageContentTemplate,
}

const Template: Story<StaticPageContentTemplateProps> = (args) => <StaticPageContentTemplate {...args} />

export const Default = Template.bind({})
Default.args = {
  metadata: {
    title: 'Lorem Ipsum',
    description:
      'Donec condimentum arcu sed arcu porttitor congue. Nunc at augue eget leo pellentesque convallis vitae et est. Mauris vitae euismod velit, eu tristique tellus. Proin blandit rutrum molestie.',
    image: 'https://picsum.photos/500',
    siteUrl: 'https://fingerprintjs.com/',
  },
  invertContent: false,
  inlineCta: ctaArgs,
  cardSection: cardSectionArgs,
  blocks: blocksArgs.blocks,
  hero: heroArgs,
}
