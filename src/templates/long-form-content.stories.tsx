import React from 'react'
import { Story } from '@storybook/react'
import { LongFormContentTemplate, TemplateProps } from './long-form-content'
import { DangerouslyRenderHtmlContent } from '../components/Content/Content'
import PreviewProviders from '../cms/PreviewProviders'

export default {
  title: 'Pages / Long Form Content',
  component: LongFormContentTemplate,
}

const Template: Story<TemplateProps> = (args) => (
  <PreviewProviders>
    <LongFormContentTemplate {...args} />
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
  post: {
    title: 'Lorem Ipsum',
    description:
      'Nulla ac elementum dolor. Duis finibus elit elit, nec volutpat augue venenatis id. Etiam tincidunt nisi lorem, eu venenatis nunc finibus quis. Curabitur at diam quis neque ultricies tristique.',
    publishDate: 'January 25, 2021',
    path: '/lorem-ipsum',
  },
  body:
    '<img alt="img" src="https://picsum.photos/500" /><p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p><h2>Header Level 2</h2><ol><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li></ol><h3>Header Level 3</h3><ul><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li></ul><blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p></blockquote><pre><code>#header h1 a {  display: block;  width: 300px;  height: 80px;}</code></pre>',
  contentComponent: DangerouslyRenderHtmlContent,
  breadcrumbs: [
    { pathname: '/', crumbLabel: 'Home' },
    { pathname: '/', crumbLabel: 'Content' },
    { pathname: '/', crumbLabel: 'Lorem Ipsum' },
  ],
}
