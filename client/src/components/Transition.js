import {
  cloneElement,
  createRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  CSSTransition,
  SwitchTransition as ReactTransitionGroupSwitchTransition,
  TransitionGroup as ReactTransitionGroup,
} from 'react-transition-group';

export const TransitionGroup = ReactTransitionGroup;

const cloneChildren = (children, nodeRef) => {
  const childrenSafe = isValidElement(children) ? (
    children
  ) : (
    <span>{children}</span>
  );

  return cloneElement(childrenSafe, {
    ref: (node) => {
      nodeRef.current = node;

      const { ref } = children;
      if (typeof ref === 'function') {
        ref(node);
      }
    },
  });
};

/**
 * Wrapper around react-transition-group's CSSTransition that handles boilerplate.
 * Due to how CSSTransition and Tailwind work there is likely to be specificity conflicts during enter/enterActive, exit/exitActive.
 * A workaround is to prefix the *Active classNames with a '!', that way they take precedence over the original style.
 * For example if enter has 'opacity-0' and enterActive has 'opacity-100', change enterActive to be '!opacity-100'.
 * @param {Object} props
 * @param {React.ReactNode} props.children - The child elements to render.
 **/
export const Transition = ({ children, ...props }) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      {...props}
      nodeRef={nodeRef}
      addEndListener={(done) =>
        nodeRef.current.addEventListener('transitionend', done, false)
      }
    >
      {cloneChildren(children, nodeRef)}
    </CSSTransition>
  );
};

/**
 * Wrapper around react-transition-group's SwitchTransition component that handles boilerplate.
 * @param {Object} props
 * @param {string} props.switchKey - The key to pass to the SwitchTransition component.
 * @param {React.ReactNode} props.children - The child elements to render.
 **/
export const SwitchTransition = ({ as, switchKey, children, ...props }) => {
  const ComponentToRender = as || Transition;

  return useMemo(() => {
    const nodeRef = createRef();

    return (
      <ReactTransitionGroupSwitchTransition>
        <ComponentToRender
          {...props}
          key={switchKey}
          nodeRef={nodeRef}
          addEndListener={(done) =>
            nodeRef.current.addEventListener('transitionend', done, false)
          }
        >
          {cloneChildren(children, nodeRef)}
        </ComponentToRender>
      </ReactTransitionGroupSwitchTransition>
    );
    // Only memoize when the key changes or when the children change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchKey, children]);
};

/**
 * Wrapper around react-transition-group's Transition which caches children when exiting.
 * @param {Object} props
 * @param {React.ElementType} props.as - Customize which type of Transition gets rendered.
 * @param {React.ReactNode} props.children - The child elements to render.
 **/
export const MemoizedTransition = ({ as, children, ...props }) => {
  const ComponentToRender = as || Transition;
  const previousChildren = useRef(null);

  useEffect(() => {
    previousChildren.current = children;
  }, [props.in, children]);

  return (
    <ComponentToRender {...props} unmountOnExit>
      {props.in ? children : previousChildren.current}
    </ComponentToRender>
  );
};

/**
 * Transition which Fades in and out.
 **/
export const Fade = (props) => {
  return (
    <Transition
      {...props}
      classNames={{
        appear: 'opacity-0',
        appearActive: 'transition-opacity ease-in !opacity-100',
        enter: 'opacity-0',
        enterActive: 'transition-opacity ease-in !opacity-100',
        exit: 'opacity-100',
        exitActive: 'transition-opacity ease-out !opacity-0',
      }}
    />
  );
};

/**
 * Transition which Fades in and out.
 **/
 export const FadeQuick = (props) => {
  return (
    <Transition
      {...props}
      classNames={{
        appear: 'opacity-0',
        appearActive: 'transition-opacity ease-in duration-75 !opacity-100',
        enter: 'opacity-0',
        enterActive: 'transition-opacity ease-in duration-75 !opacity-100',
        exit: 'opacity-100',
        exitActive: 'transition-opacity ease-out duration-75 !opacity-0',
      }}
    />
  );
};

/**
 * Transition which Pops in.
 **/
export const PopIn = (props) => {
  return (
    <Transition
      {...props}
      classNames={{
        appear: 'scale-90',
        appearActive: 'transition-transform ease-out !scale-100',
        enter: 'scale-90',
        enterActive: 'transition-transform ease-out !scale-100',
        exit: 'scale-100',
        exitActive: 'transition-transform ease-out duration-75 !scale-90',
      }}
    />
  );
};

/**
 * Transition which Fades in and out and Pops in.
 **/
export const FadeAndPopIn = (props) => {
  return (
    <Transition
      {...props}
      classNames={{
        appear: 'opacity-0 scale-75',
        appearActive: 'transition-[transform,opacity] !opacity-100 !scale-100',
        enter: 'opacity-0 scale-75',
        enterActive: 'transition-[transform,opacity] !opacity-100 !scale-100',
        exit: 'opacity-100',
        exitActive: 'transition-opacity duration-75 !opacity-0',
      }}
    />
  );
};
