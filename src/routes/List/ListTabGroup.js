import cx from 'classnames';
import { Badge } from 'components/Badge';


const Tab = ({
    active,
    name,
    count
}) => {
    return (
        <div
            className={cx(
                active
                    ? 'bg-green-700 text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-700',
                'px-3 py-2 flex gap-2 cursor-pointer rounded-md',
                'font-medium text-md'
            )}
        >
            <span>{name}</span>
            <Badge variant={active ? 'inverse' : 'default'} size="lg">{count}</Badge>
        </div>
    );
}


export const ListTabGroup = ({ children }) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 space-x-4">
                <Tab name="Active" active count={7} />
                <Tab name="Complete" count={4} />
            </div>
            {children}
        </div>
    );
};