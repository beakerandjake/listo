import React from 'react';
import { Flipper, Flipped, spring } from 'react-flip-toolkit';

// Callback invoked by react-flip-toolkit, transitions the opacity from 0 to 1 while a Flipped Element is appearing.
const fadeFlippedElementIn = (el, index) =>
  spring({
    config: {
      damping: 126,
      stiffness: 3984,
    },
    onUpdate: (val) => {
      el.style.opacity = val;
    },
  });

// Callback invoked by react-flip-toolkit, transitions the opacity from 1 to 0 while a Flipped Element is exiting.
const fadeFlippedElementOut = (el, index, removeElement) => {
  spring({
    config: {
      damping: 126,
      stiffness: 3984,
    },
    onUpdate: (val) => {
      el.style.opacity = 1 - val;
    },
    onComplete: removeElement,
  });

  return () => {
    el.style.opacity = '';
    removeElement();
  };
};

/**
 * Renders a changes to list of React Components using the FLIP technique,
 * applies transition effects whenever items change.
 * @param {Object} props
 * @param {array} props.items - The items to render.
 * @param {function} props.onItemSelected - Callback invoked when the user clicks on an item.
 */
export const FlippedList = ({ children, ...props }) => {
  const flippedChildren = React.Children.toArray(children);

  if (!flippedChildren.every((x) => x.key)) {
    throw new Error(
      'Each child of the <FlippedList> must have a Key property specified'
    );
  }

  return (
    <Flipper {...props} flipKey={flippedChildren.map((x) => x.key).join('')}>
      {flippedChildren.map((x) => (
        <Flipped
          key={x.key}
          flipId={x.key}
          spring="stiff"
          onAppear={fadeFlippedElementIn}
          onExit={fadeFlippedElementOut}
        >
          {/* Wrap in DIV so don't have to forward Flipped props to each child */}
          <div>{x}</div>
        </Flipped>
      ))}
    </Flipper>
  );
};
