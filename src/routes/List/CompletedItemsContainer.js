import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import classNames from "classnames";
import { Root, Trigger, Content } from '@radix-ui/react-collapsible';
import { Badge } from "components/Badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    EllipsisDropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuHeading
} from "components/DropdownMenu";

export function CompletedItemsContainer(props) {
    const [open, setOpen] = useState(false);

    const container = (
        <Root open={open} onOpenChange={setOpen}>
            <div
                className={classNames({ "border-b border-gray-200": !open },
                    "mt-2 w-full flex items-center justify-between gap-2 cursor-pointer select-none "
                )}
            >
                <Trigger className="py-5 flex items-center flex-1 gap-2 group focus:outline-none focus-visible:outline-none">
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className={classNames({ 'rotate-90': open }, "transition-transform rounded group-focus-visible:ring-2 group-focus-visible:ring-offset-2 group-focus-visible:ring-indigo-500")}
                        fixedWidth
                    />
                    <h3 className="text-md leading-6 font-medium text-gray-700">
                        <span className="pr-2">Completed</span>
                        <Badge content={props.count} size="lg" variant="success" />
                    </h3>
                </Trigger>
                <div className="flex-grow-0 flex items-center">
                    <DropdownMenu modal={false}>
                        <EllipsisDropdownMenuTrigger />
                        <DropdownMenuContent loop={true}>
                            <DropdownMenuHeading title="Completed Item Actions" />
                            <DropdownMenuItem icon={faRotateLeft} label="Mark Items Incomplete" onClick={props.onSetAllItemsCompleted} />
                            <DropdownMenuItem icon={faTrashCan} variant="danger" label="Delete Completed Items" onClick={props.onDeleteAllItems} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <Content>
                {props.children}
            </Content>
        </Root>
    );

    return (
        <>
            {/* todo animate fade in / out */}
            {props.count > 0 && container}
        </>
    )
}