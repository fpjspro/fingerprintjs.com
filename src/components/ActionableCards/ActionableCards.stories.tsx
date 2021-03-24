import React from 'react'
import { Story } from '@storybook/react'
import Container from '../common/Container'
import ActionableCards, { ActionableCardsProps } from './ActionableCards'

export default {
  title: 'Components / ActionableCards',
  component: ActionableCards,
}

const Template: Story<ActionableCardsProps> = (args) => (
  <Container size='large'>
    <ActionableCards {...args} />
  </Container>
)

export const ActionableCardss = Template.bind({})
ActionableCardss.args = {
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
