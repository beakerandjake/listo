import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faRotateLeft, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { Root, Trigger, Content } from '@radix-ui/react-collapsible';
import { Badge } from "components/Badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    EllipsisDropdownMenuTrigger
} from "components/DropdownMenu";

export function CompletedItemsContainer(props) {
    const [open, setOpen] = useState(false);

    return (
        <Root open={open} onOpenChange={setOpen}>
            <div
                className={classNames({ "border-b border-gray-200": !open },
                    "mt-2 w-full flex items-center justify-between gap-2 cursor-pointer select-none focus:outline-none"
                )}
            >
                <Trigger className="py-5 flex items-center flex-1 gap-2">
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className={classNames({ 'rotate-90': open }, "transition-transform")}
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
                        <DropdownMenuContent>
                            <DropdownMenuItem icon={faRotateLeft} text="Mark Items Incomplete" onClick={props.onSetAllItemsCompleted} />
                            <DropdownMenuItem icon={faTrashAlt} text="Delete Completed Items" onClick={props.onDeleteAllItems} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <Content>
                {props.children}
            </Content>
        </Root>
    )
}