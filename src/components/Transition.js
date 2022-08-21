import { cloneElement, createRef, forwardRef, useMemo, useRef } from "react";
import { CSSTransition, SwitchTransition as ReactTransitionGroupSwitchTransition } from "react-transition-group";

/**
* Appends a '!' prefix to each className in the string.. 
* @param {string} classNames - A string of space separated classNames.
* @returns {array} An array of all classNames, with the ! prefixed to each one.
**/
const addImportantPrefix = (classNames) =>
    classNames
        .split(' ')
        .filter((className) => className.trim().length > 1)
        .map(x => `!${x}`)
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
const generateClassNames = (enter, enterActive, enterDone, exit, exitActive, exitDone) => ({
    enter,
    enterActive: addImportantPrefix(enterActive),
    enterDone,
    exit,
    exitActive: addImportantPrefix(exitActive),
    exitDone
})

/**
 * Wrapper around react-transition-group's CSSTransition component that allows easier usage with TailwindCSS. 
 * @param {Object} props
 * @param {string} props.enter - Classes to apply during enter phase.
 * @param {string} props.enterActive - Classes to apply during the entire enter phase.
 * @param {string} props.enterDone - Classes to apply during the entered phase.
 * @param {string} props.exit - Classes to apply during the entire exit phase.
 * @param {string} props.exitActive - Classes to apply during the exiting phase.
 * @param {string} props.enterDone - Classes to apply during the exited phase.
 * @param {React.ReactNode} props.children - The child elements to render.
 **/
export const Transition = forwardRef(({
    enter,
    enterActive,
    enterDone,
    exit,
    exitActive,
    exitDone,
    children,
    ...props
}, ref) => {
    const childrenRef = useRef(null);

    return (
        <CSSTransition
            {...props}
            ref={ref}
            nodeRef={childrenRef}
            classNames={generateClassNames(enter, enterActive, enterDone, exit, exitActive, exitDone)}
            addEndListener={(done) => childrenRef.current.addEventListener("transitionend", done, false)}
        >
            {cloneElement(children, { ref: (ref) => (childrenRef.current = ref) })}
        </CSSTransition>
    );
});

export const SwitchTransition = ({
    switchKey,
    enter,
    enterActive,
    enterDone,
    exit,
    exitActive,
    exitDone,
    children
}) => {
    return useMemo(() => {
        const nodeRef = createRef();
        return (
            <ReactTransitionGroupSwitchTransition>
                <CSSTransition
                    key={switchKey}
                    nodeRef={nodeRef}
                    classNames={generateClassNames(enter, enterActive, enterDone, exit, exitActive, exitDone)}
                    addEndListener={(done) => nodeRef.current.addEventListener("transitionend", done, false)}
                >
                    {cloneElement(children, { ref: (ref) => (nodeRef.current = ref) })}
                </CSSTransition>
            </ReactTransitionGroupSwitchTransition>
        );
    }, [switchKey, children, enter, enterActive, enterDone, exit, exitActive, exitDone]);
};
