import React from 'react'
import { Story } from '@storybook/react'
import Container from '../common/Container'
import ActionableCard, { ActionableCardProps } from './ActionableCard'

export default {
  title: 'Components / ActionableCard',
  component: ActionableCard,
}

const Template: Story<ActionableCardProps> = (args) => (
  <Container size='large'>
    <ActionableCard {...args} />
  </Container>
)

export const ActionableCards = Template.bind({})
ActionableCards.args = {
  cards: [
    {
      title: 'Sed facilisis.',
      description: 'Vestibulum semper nulla semper arcu rhoncus congue.',
      content: 'Cras pellentesque arcu eu ligula tristique lacinia.scelerisque laoreet.',
      btnText: 'arcu',
      btnHref: '',
      variant: 'primary',
    },
    {
      title: 'Aliquam leo.',
      description: 'Praesent in odio condimentum, tristique odio quis, efficitur eros.',
      content: 'Curabitur nec magna sit amet dui tempus interdum aliquam eu elit.',
      btnText: 'ligula',
      btnHref: '',
      variant: 'outline',
    },
    {
      title: 'Fusce convallis.',
      description: 'Pellentesque sed feugiat lorem.',
      content: 'Praesent consequat orci eu elementum condimentum.',
      btnText: 'aliquam',
      btnHref: '',
      variant: 'clear',
    },
    {
      title: 'Curabitur sit.',
      description: 'Pellentesque at erat elementum, volutpat tellus vitae.',
      content: 'Morbi vel nulla nec justo tincidunt sagittis.',
      btnText: 'Praesent',
      btnHref: '',
      variant: 'faded',
    },
  ],
}
