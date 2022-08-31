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
                    ? 'bg-green-700 text-white'
                    : 'text-gray-500 hover:text-gray-700',
                'px-3 py-2 font-medium text-sm rounded-md',
                'cursor-pointer flex gap-2'
            )}
        >
            <span>{name}</span>
            <Badge variant={active ? 'inverse' : 'default'}>{count}</Badge>
        </div>
    );
}


export const ListTabGroup = ({ children }) => {

    return (
        <div className="flex items-center justify-between border-b-2 border-color-gray-600 pb-2 pr-2">
            <div className="flex flex-1 space-x-4">
                <Tab name="Active" active count={7} />
                <Tab name="Complete" count={4} />
            </div>
            {children}
        </div>
    );
};