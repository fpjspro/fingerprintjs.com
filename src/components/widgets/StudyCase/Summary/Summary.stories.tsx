import React from 'react'
import { Story } from '@storybook/react'
import Summary, { SummaryProps } from './Summary'

import styles from './Summary.module.scss'

export default {
  title: 'Widgets / Study Case ',
  component: Summary,
}

const Template: Story<SummaryProps> = (args) => <Summary {...args} />

export const SummaryStory = Template.bind({})
SummaryStory.args = {
  results: [
    {
      title: 'Vestibulum id risus non nisl fermentum rhoncus non ut turpis.',
      children: (
        <p className={styles.result}>
          Fusce vitae varius erat. Quisque tellus nulla, tincidunt vel auctor a, commodo ut augue. Nulla sollicitudin
          fringilla tellus ut pulvinar. Ut et euismod lacus, sit amet fringilla diam.
        </p>
      ),
    },
    {
      title: 'Sed facilisis interdum congue.',
      children: (
        <>
          <p className={styles.result}>
            Cras pellentesque arcu eu ligula tristique lacinia. Etiam luctus arcu eu scelerisque laoreet. Integer
            interdum ullamcorper nibh. In fringilla orci id tincidunt fermentum. Mauris molestie volutpat vulputate. Sed
            aliquam non purus sed ornare. Morbi ultricies mi ut ex auctor, nec suscipit leo accumsan. Vivamus pulvinar
            porta urna.
          </p>
          <p className={styles.result}>
            Curabitur nec magna sit amet dui tempus interdum aliquam eu elit. Donec lacus mi, aliquam eu fermentum sit
            amet, vestibulum vitae enim. Vivamus nec facilisis dolor, et fringilla urna. Aliquam quis sem purus.
            Praesent sed nibh nec ipsum lobortis tempor et accumsan diam. Nulla pretium scelerisque odio vitae iaculis.
            Vestibulum euismod, velit nec mattis mollis, neque nibh elementum nulla, eu luctus massa purus posuere
            nulla.
          </p>
        </>
      ),
    },
    {
      title: 'Aliquam non ultrices leo.',
      children: (
        <p className={styles.result}>
          Praesent consequat orci eu elementum condimentum. Sed et ligula ac nulla pellentesque commodo ac ac orci.
          Proin eu vehicula nisl, porta laoreet elit. Sed ullamcorper, felis ut malesuada fermentum, tellus tortor
          dictum turpis, id lacinia diam mauris at sapien. Aliquam gravida cursus mauris id hendrerit.
        </p>
      ),
    },
  ],
  description:
    'Morbi vel nulla nec justo tincidunt sagittis sit amet quis ipsum. Curabitur sit amet vestibulum ex. Aenean et purus fermentum, accumsan ante vel, sollicitudin odio. Praesent ut nunc tortor. Pellentesque cursus ante et augue convallis malesuada. Nullam volutpat sapien nisl, finibus vestibulum quam vehicula in. Aenean non dui non neque dictum condimentum.',
  bullets: [
    {
      value: 'Vestibulum',
      description: 'Tincidunt',
    },
    {
      value: 'Accumsan',
      description: 'Nullam',
    },
    {
      value: 'Pellentesque',
      description: 'Malesuada',
    },
  ],
}
