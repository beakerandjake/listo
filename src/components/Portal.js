import { createPortal } from "react-dom";

const Overlay = () => {
    return (
        <div></div>
    );
}

export const Portal = ({ children }) => {
    return createPortal(children, document.body);
};