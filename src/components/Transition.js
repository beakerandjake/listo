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
* Appends a '!' prefix to each className in the string.. 
* @param {string} classNames - A string of space separated classNames.
* @returns {array} An array of all classNames, with the ! prefixed to each one.
**/
const addImportantPrefix = (classNames) =>
    classNames
        .split(' ')
        .filter((className) => className.trim().length > 1)
        // Don't prefix classes transition-x utilities.
        // That way they can be over-ridden by other utility classes like duration-x
        .map(x => x.startsWith('transition') ? x : `!${x}`)
        .join(' ') || '';

/**
* Creates a classNames object which can be passed to a CSSTransition component.
* But most importantly appends a ! modifier to each *Active class. 
* This ensures that enterActive/exitActive classes take priority over enter/exit classes. 
* Without this there would be conflicts between those classes,
* and since their css specificity would be the same there would be inconsistent results when animating.  
* @param {Object} props
* @param {string} props.icon - The icon to display.
* @param {string} props.text - The text to display.
* @param {string=} props.className - Additional styles to apply to the component
*/
const generateClassNames = (
    enter = '',
    enterActive = '',
    exit = '',
    exitActive = '',
) => ({
    enter: enter,
    enterActive: addImportantPrefix(enterActive),
    exit: exit,
    exitActive: addImportantPrefix(exitActive),
})

/**
 * Wrapper around react-transition-group's CSSTransition component that allows easier usage with TailwindCSS. 
 * @param {Object} props
 * @param {string} props.enter - Classes to apply during enter phase.
 * @param {string} props.enterActive - Classes to apply during the entire enter phase.
 * @param {string} props.exit - Classes to apply during the entire exit phase.
 * @param {string} props.exitActive - Classes to apply during the exiting phase.
 * @param {string} props.classNames - When provided, will only use this value for classNames.
 * @param {React.ReactNode} props.children - The child elements to render.
 **/
export const Transition = ({
    enter,
    enterActive,
    exit,
    exitActive,
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
            classNames={classNames || generateClassNames(enter, enterActive, exit, exitActive)}
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
                    classNames={classNames || generateClassNames(enter, enterActive, exit, exitActive)}
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
