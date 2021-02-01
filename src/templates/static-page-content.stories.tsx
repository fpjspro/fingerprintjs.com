import React from 'react'
import { Story } from '@storybook/react'
import { StaticPageContentTemplate, StaticPageContentTemplateProps } from './static-page-content'
import { Default as ctaDefault } from '../components/widgets/InlineCta/InlineCta.stories'
import { Default as cardSectionDefault } from '../components/widgets/CardSection/CardSection.stories'
import { Default as blocksDefault } from '../components/widgets/AlternatingImagesText/AlternatingImagesText.stories'
import { Default as heroDefault } from '../components/widgets/Hero/Hero.stories'
import { InlineCtaProps } from '../components/widgets/InlineCta'
import { CardSectionProps } from '../components/widgets/CardSection'
import { BlockWithImage } from '../components/widgets/AlternatingImagesText'
import { HeroProps } from '../components/widgets/Hero'
import PreviewProviders from '../cms/PreviewProviders'

export default {
  title: 'Pages / Static Page Content',
  component: StaticPageContentTemplate,
}

const Template: Story<StaticPageContentTemplateProps> = (args) => (
  <PreviewProviders>
    <StaticPageContentTemplate {...args} />
  </PreviewProviders>
)

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
  inlineCta: ctaDefault.args as InlineCtaProps,
  cardSection: cardSectionDefault.args as CardSectionProps,
  blocks: blocksDefault.args?.blocks as BlockWithImage[],
  hero: heroDefault.args as HeroProps,
}
