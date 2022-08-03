import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ConfirmModal } from "components/ConfirmModal";
import { IconButton } from "components/IconButton";
import { useState } from "react";

export function ConfirmDeleteButton(props) {
    const [isOpen, setIsOpen] = useState(false);

    const onConfirmDelete = () => {
        setIsOpen(false);
        props.onConfirmDelete();
    }

    return (
        <>
            {/* Delete Button, clicking opens the confirm modal. */}
            <IconButton icon={faTrashAlt} title="Delete Item" onClick={() => setIsOpen(true)} />

            <ConfirmModal
                open={isOpen}
                onDismiss={() => setIsOpen(false)}
                onConfirm={onConfirmDelete}
                variant="danger"
                title="Delete Item?"
                message="This item will be permanently deleted."
                confirmButtonText="Delete"
            />
        </>
    )
}