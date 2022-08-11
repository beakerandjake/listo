import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Drawer, DrawerClose } from 'components/Drawer';

export function CollapsibleSidebarContainer(props) {
    return (
        <Drawer open={props.open} onClose={props.onSetClose} size="xs" anchor="left">
            {props.children}
            <DrawerClose className="absolute top-0 right-0 -mr-9 mt-2 pt-2" title="Close Navigation">
                <FontAwesomeIcon icon={faTimes} size="xl" className="text-white font-thin" />
            </DrawerClose >
        </Drawer>
    )
}