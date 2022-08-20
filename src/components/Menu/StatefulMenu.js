import { useState } from "react"

/**
 * Wrapper component which manages an Open state.
 * Open/SetOpen are passed to the children via render props.
 * @param {Object} props
 * @param {boolean} props.open - Is the menu currently opened or closed?
 */
export const StatefulMenu = ({ children }) => {
    const [open, setOpen] = useState(false);
    return children({ open, setOpen });
}