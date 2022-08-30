import { faBars } from '@fortawesome/pro-solid-svg-icons';
import { NavLogo } from "components/Navigation/NavLogo";
import { IconButton } from "components/IconButton";

/**
 * Sticky nav bar which sits at the top of the page.
 * @param {object} props - the props
 * @param {function} props.onClickMenuButton - Callback invoked when the user clicks the menu button.
 **/
export const Navbar = ({ onClickMenuButton }) => {
    return (
        <div className="sticky top-0 h-14 flex items-center justify-center gap-2 drop-shadow-md bg-white">
            <IconButton
                icon={faBars}
                className="p-2 ml-2 absolute left-0"
                onClick={onClickMenuButton}
            />
            <NavLogo />
        </div>
    )
};