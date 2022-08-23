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
 * Wrapper around react-transition-group's CSSTransition that handles boilerplate. 
 * Due to how CSSTransition and Tailwind work there is likely to be specificity conflicts during enter/enterActive, exit/exitActive.
 * A workaround is to prefix the *Active classNames with a '!', that way they take precedence over the original style.
 * For example if enter has 'opacity-0' and enterActive has 'opacity-100', change enterActive to be '!opacity-100'.
 * @param {Object} props
 * @param {React.ReactNode} props.children - The child elements to render.
 **/
export const Transition = ({
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
            addEndListener={(done) => nodeRef.current.addEventListener("transitionend", done, false)}
        >
            {cloneElement(childrenSafe, {
                ref(node) {
                    nodeRef.current = node;

                    const { ref } = children;
                    if (typeof ref === 'function') {
                        ref(node);
                    }
                }
            })}
        </CSSTransition>
    );
};

/**
 * Wrapper around react-transition-group's SwitchTransition component that handles boilerplate.
 * @param {Object} props
 * @param {string} props.switchKey - The key to pass to the SwitchTransition component.
 * @param {React.ReactNode} props.children - The child elements to render.
 **/
export const SwitchTransition = ({
    switchKey,
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