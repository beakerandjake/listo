import {
    cloneElement,
    createRef,
    isValidElement,
    useMemo,
    useRef
} from "react";
import {
    CSSTransition,
    SwitchTransition as ReactTransitionGroupSwitchTransition
} from "react-transition-group";

/**
 * Wrapper around react-transition-group's CSSTransition component that allows easier usage with TailwindCSS. 
 * Due to how CSSTransition and Tailwind work there is likely to be specificity conflicts during enter/enterActive, exit/exitActive.
 * A workaround is to prefix the *Active classNames with a '!', that way they take precedence over the original style.
 * For example if enter has 'opacity-0' and enterActive has 'opacity-100', change enterActive to be '!opacity-100'.
 * @param {Object} props
 * @param {string} props.enter - Classes to apply during enter phase.
 * @param {string} props.enterActive - Classes to apply during the entire enter phase.
 * @param {string} props.exit - Classes to apply during the entire exit phase.
 * @param {string} props.exitActive - Classes to apply during the exiting phase.
 * @param {string} props.classNames - When provided, will only use this value for classNames.
 * @param {React.ReactNode} props.children - The child elements to render.
 **/
export const Transition = ({
    enter = '',
    enterActive = '',
    exit = '',
    exitActive = '',
    classNames,
    children,
    ...props
}) => {
    const nodeRef = useRef(null);

    const childrenSafe = isValidElement(children)
        ? children
        : <span>{children}</span>;

    return (
        <CSSTransition
            {...props}
            nodeRef={nodeRef}
            classNames={classNames || { enter, enterActive, exit, exitActive }}
            addEndListener={(done) => nodeRef.current.addEventListener("transitionend", done, false)}
        >
            {cloneElement(childrenSafe, { ref: (ref) => (nodeRef.current = ref) })}
        </CSSTransition>
    );
};

/**
 * Wrapper around react-transition-group's SwitchTransition component that allows easier usage with TailwindCSS. 
 * @param {Object} props
 * @param {string} props.switchKey - The key to pass to the SwitchTransition component.
 * @param {string} props.enter - Classes to apply during enter phase.
 * @param {string} props.enterActive - Classes to apply during the entire enter phase.
 * @param {string} props.exit - Classes to apply during the entire exit phase.
 * @param {string} props.exitActive - Classes to apply during the exiting phase.
 * @param {string} props.classNames - When provided, will only use this value for classNames.
 * @param {React.ReactNode} props.children - The child elements to render.
 **/
export const SwitchTransition = ({
    switchKey,
    enter,
    enterActive,
    exit,
    exitActive,
    classNames,
    children,
    ...props
}) => {
    return useMemo(() => {
        const nodeRef = createRef();

        const childrenSafe = isValidElement(children)
            ? children
            : <span>{children}</span>;

        return (
            <ReactTransitionGroupSwitchTransition>
                <CSSTransition
                    {...props}
                    key={switchKey}
                    nodeRef={nodeRef}
                    classNames={classNames || { enter, enterActive, exit, exitActive }}
                    addEndListener={(done) => nodeRef.current.addEventListener("transitionend", done, false)}
                >
                    {cloneElement(childrenSafe, { ref: (ref) => (nodeRef.current = ref) })}
                </CSSTransition>
            </ReactTransitionGroupSwitchTransition>
        );
        // Only memoize when the key changes or when the children change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [switchKey, children]);
};