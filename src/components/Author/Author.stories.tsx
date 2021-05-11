import React from 'react'
import { Story } from '@storybook/react'
import AuthorComponent, { AuthorComponentProps } from './Author'

export default {
  title: 'Components / Author',
  component: AuthorComponent,
}

const Template: Story<AuthorComponentProps> = (args) => <AuthorComponent {...args} />

export const Default = Template.bind({})
Default.args = {
  author: {
    name: 'Vinicius Lambardozzi',
    role: 'FingerprintJS Developer',
    photo: 'https://picsum.photos/500',
  },
}
