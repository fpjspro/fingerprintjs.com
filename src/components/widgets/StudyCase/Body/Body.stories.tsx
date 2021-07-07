import React from 'react'
import { Story } from '@storybook/react'
import Body, { BodyProps } from './Body'

export default {
  title: 'Widgets / Study Case ',
  component: Body,
}

const Template: Story<BodyProps> = (args) => <Body {...args} />

export const BodyStory = Template.bind({})
BodyStory.args = {
  body: (
    <>
      <h2>Pellentesque habitant morbi tristique</h2>
      <h3>Aliquam tincidunt mauris eu risus.</h3>
      <p>
        senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
        tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em>{' '}
        Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi,
        condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt
        condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.
      </p>

      <h3>Aliquam tincidunt mauris eu risus.</h3>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
      <p>Aliquam tincidunt mauris eu risus.</p>
      <ul>
        <li>
          <strong>Lorem ipsum dolor sit amet </strong>
          consectetur adipiscing elit
        </li>
        <li>
          <strong>Vivamus magna </strong>
        </li>
        <li>
          <strong>VAliquam tincidunt mauris eu risus.</strong>
        </li>
      </ul>
    </>
  ),
}
