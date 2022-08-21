import { cloneElement, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

/**
 * Join an array of class names together into one long class name.
 * But most importantly * appends a ! modifier to each class name. 
 * This ensures that enterActive/exitActive classes take priority over enter/exit classes. 
 * Without this there would be conflicts between those classes,
 * and since their css specificity would be the same there would be inconsistent results when animating.  
 * @param {Object} props
 * @param {string} props.icon - The icon to display.
 * @param {string} props.text - The text to display.
 * @param {string=} props.className - Additional styles to apply to the component
 */
function generateActiveClassName(...classes) {
    return classes
        .filter(x => !!x)
        .map(x => x.split(' ')
            .filter((className) => className.trim().length > 1)
            .map(x => `!${x}`)
            .join(' ')
        )
        .join(' ') || '';
}

/**
 * Wrapper around react-transition-group's CSSTransition component that allows easier usage with TailwindCSS.
 * Will mark enterActive/exitActive classes as important to fix specificity conflicts between enter/enterActive and exit/exitActive.
 * Also manages setting the nodeRef and 
 * @param {Object} props
 * @param {boolean} props.show - The icon to display.
 * @param {string} props.enter - Classes to apply during enter phase.
 * @param {string} props.enterActive - Classes to apply during the entire enter phase.
 * @param {string} props.enterDone - Classes to apply during the entered phase.
 * @param {number=} props.enterTimeout - The icon to display.
 * @param {string} props.exit - Classes to apply during the entire exit phase.
 * @param {string} props.exitActive - Classes to apply during the exiting phase.
 * @param {string} props.enterDone - Classes to apply during the exited phase.
 * @param {number=} props.exitTimeout - Duration of the exit timeout in ms.
 * @param {function} props.onBeforeEnter - Callback invoked before the enter transition starts.
 * @param {function} props.onEntering - Callback invoked when the enter transition starts.
 * @param {function} props.onAfterEnter - Callback invoked when the enter transition finishes.
 * @param {function} props.onBeforeExit - Callback invoked before the exit transition starts.
 * @param {function} props.onExiting - Callback invoked when the exit transition starts.
 * @param {function} props.onAfterExit - Callback invoked when the exit transition finishes.
 * @param {React.ReactNode} props.children - The child elements to render.
 **/
export const Transition = ({
    show,
    enter,
    enterActive,
    enterDone,
    enterTimeout = 0,
    exit,
    exitActive,
    exitDone,
    exitTimeout = 0,
    onBeforeEnter,
    onEntering,
    onAfterEnter,
    onBeforeExit,
    onExiting,
    onAfterExit,
    children,
    ...props
}) => {
    const childrenRef = useRef(null);
    const [classNames, setClassNames] = useState(null);

    useEffect(() => {
        setClassNames({
            enter,
            enterActive: generateActiveClassName(enterActive),
            exit,
            exitActive: generateActiveClassName(exitActive)
        });

    }, [enter, enterActive, enterDone, exit, exitActive, exitDone]);

    return (
        <CSSTransition
            {...props}
            nodeRef={childrenRef}
            in={!!show}
            unmountOnExit
            timeout={{
                enter: enterTimeout,
                exit: exitTimeout
            }}
            classNames={classNames || {}}
            onEnter={() => onBeforeEnter && onBeforeEnter()}
            onEntering={() => onEntering && onEntering()}
            onEntered={() => onAfterEnter && onAfterEnter()}
            onExit={() => onBeforeExit && onBeforeExit()}
            onExiting={() => onExiting && onExiting()}
            onExited={() => onAfterExit && onAfterExit()}
        >
            {cloneElement(children, { ref: (ref) => (childrenRef.current = ref) })}
        </CSSTransition>
    );
};