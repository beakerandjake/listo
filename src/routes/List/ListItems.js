import { Flipper, Flipped, spring } from "react-flip-toolkit"
import { ListItem } from "./Item";

// Callback invoked by react-flip-toolkit, transitions the opacity from 0 to 1 while a Flipped Element is appearing.
const fadeFlippedElementIn = (el, index) => spring({
    config: {
        damping: 126,
        stiffness: 3984
    },
    onUpdate: val => {
        el.style.opacity = val;
    },
});

// Callback invoked by react-flip-toolkit, transitions the opacity from 1 to 0 while a Flipped Element is exiting.
const fadeFlippedElementOut = (el, index, removeElement) => {
    spring({
        config: {
            damping: 126,
            stiffness: 3984
        },
        onUpdate: val => {
            el.style.opacity = 1 - val;
        },
        onComplete: removeElement
    });

    return () => {
        el.style.opacity = "";
        removeElement();
    }
};

/**
 * Renders the items of a list, applies transition effects whenever the order of the items change.
 * @param {Object} props
 * @param {array} props.items - The items to render.
 * @param {function} props.onItemSelected - Callback invoked when the user clicks on an item.
 * @param {function} props.onItemChange - Callback invoked when the user has made changes to an item.
 */
export const ListItems = ({
    items,
    onItemSelected,
    onItemChange
}) => {
    return (
        <Flipper flipKey={items.map(x => x.id).join('')}>
            <div className="w-full flex flex-col gap-2">
                {items.map(x => (
                    <Flipped
                        key={x.id}
                        flipId={x.id}
                        spring="stiff"
                        onAppear={fadeFlippedElementIn}
                        onExit={fadeFlippedElementOut}
                    >
                        {/* Wrap in DIV so don't have to forward Flipped props to ListItem */}
                        <div>
                            <ListItem
                                item={x}
                                onClick={() => onItemSelected(x.id)}
                                onItemChange={changes => onItemChange(x.id, changes)}
                            />
                        </div>
                    </Flipped>
                ))}
            </div>
        </Flipper>
    );
};