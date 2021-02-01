import React from 'react'
import { Story } from '@storybook/react'
import InlineCta, { InlineCtaProps } from './index'

export default {
  title: 'Widgets / InlineCta',
  component: InlineCta,
}

const Template: Story<InlineCtaProps> = (args) => <InlineCta {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Duis quis dui vel orci tempus condimentum in a purus.',
  subtitle:
    'Duis ullamcorper, libero porttitor facilisis pretium, urna lacus porttitor tellus, et ullamcorper leo mi et turpis. Curabitur hendrerit sed diam et tempor. Proin porta mattis urna vel sagittis.',
  buttonText: 'Action',
  buttonHref: '/',
}
