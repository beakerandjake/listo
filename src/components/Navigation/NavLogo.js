import { Link } from 'react-router-dom';
import { Logo } from 'components/Logo';

/**
 * Logo which is a link back to the home page.
 */
export function NavLogo(props) {
    return (
        <Link to="/" className="cursor-pointer rounded keyboard-only-focus-ring">
            <Logo />
        </Link>
    )
}