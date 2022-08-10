import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PageHeader } from "components/PageHeader";
import { getIcon } from "services/iconLibrary";


export function ListPageHeader(props) {
    return (
        <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 pb-3 mb-3 sm:border-b-0 sm:pb-0 sm:mb-0">
            <FontAwesomeIcon icon={getIcon(props.iconName)} size="xl" className="text-gray-500 hidden sm:block" />
            <PageHeader name={props.name} />
            {props.children}
        </div>
    )
}