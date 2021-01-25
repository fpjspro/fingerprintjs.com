import React from 'react'
import { Story } from '@storybook/react'
import CardSection, { CardSectionProps } from './index'

export default {
  title: 'Widgets / CardSection',
  component: CardSection,

  excludeStories: /.*Args/,
}

const Template: Story<CardSectionProps> = (args) => <CardSection {...args} />

export const Default = Template.bind({})
export const defaultArgs: CardSectionProps = {
  title: 'Vestibulum id risus non nisl fermentum rhoncus non ut turpis.',
  subtitle:
    'Fusce vitae varius erat. Quisque tellus nulla, tincidunt vel auctor a, commodo ut augue. Nulla sollicitudin fringilla tellus ut pulvinar. Ut et euismod lacus, sit amet fringilla diam.',
  cards: [
    {
      title: 'Sed facilisis interdum congue.',
      content:
        'Cras pellentesque arcu eu ligula tristique lacinia. Etiam luctus arcu eu scelerisque laoreet. Integer interdum ullamcorper nibh. In fringilla orci id tincidunt fermentum. Mauris molestie volutpat vulputate. Sed aliquam non purus sed ornare. Morbi ultricies mi ut ex auctor, nec suscipit leo accumsan. Vivamus pulvinar porta urna.',
    },
    {
      title: 'Aliquam non ultrices leo.',
      content:
        'Curabitur nec magna sit amet dui tempus interdum aliquam eu elit. Donec lacus mi, aliquam eu fermentum sit amet, vestibulum vitae enim. Vivamus nec facilisis dolor, et fringilla urna. Aliquam quis sem purus. Praesent sed nibh nec ipsum lobortis tempor et accumsan diam. Nulla pretium scelerisque odio vitae iaculis. Vestibulum euismod, velit nec mattis mollis, neque nibh elementum nulla, eu luctus massa purus posuere nulla.',
    },
    {
      title: 'Fusce convallis euismod eros at aliquet.',
      content:
        'Praesent consequat orci eu elementum condimentum. Sed et ligula ac nulla pellentesque commodo ac ac orci. Proin eu vehicula nisl, porta laoreet elit. Sed ullamcorper, felis ut malesuada fermentum, tellus tortor dictum turpis, id lacinia diam mauris at sapien. Aliquam gravida cursus mauris id hendrerit.',
    },
    {
      title: 'Curabitur sit amet vestibulum ex.',
      content:
        'Morbi vel nulla nec justo tincidunt sagittis sit amet quis ipsum. Curabitur sit amet vestibulum ex. Aenean et purus fermentum, accumsan ante vel, sollicitudin odio. Praesent ut nunc tortor. Pellentesque cursus ante et augue convallis malesuada. Nullam volutpat sapien nisl, finibus vestibulum quam vehicula in. Aenean non dui non neque dictum condimentum.',
    },
  ],
}
Default.args = defaultArgs
