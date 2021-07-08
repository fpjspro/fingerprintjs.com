import React from 'react'
import { Story } from '@storybook/react'
import Footer, { FooterProps } from './Footer'

export default {
  title: 'Widgets / Study Case ',
  component: Footer,
}

const Template: Story<FooterProps> = (args) => <Footer {...args} />

export const FooterStory = Template.bind({})
FooterStory.args = {
  ctaTitle: 'Duis quis dui vel orci',
  ctaSubtitle: 'Duis ullamcorper, libero porttitor facilisis pretium, urna lacus porttitor tellus, et ullamcorper leo mi et turpis. Curabitur hendrerit sed diam et tempor. Proin porta mattis urna vel sagittis.',
}
