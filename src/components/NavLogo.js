import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export function NavLogo(props) {
    return (
        <Link to="/" className="cursor-pointer rounded keyboard-only-focus-ring">
            <Logo />
        </Link>
    )
}