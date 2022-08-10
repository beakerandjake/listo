import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PageHeader } from "components/PageHeader";
import { getIcon } from "services/iconLibrary";


export function ListPageHeader(props) {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <FontAwesomeIcon icon={getIcon(props.iconName)} size="xl" className="text-gray-500 hidden sm:block" />
            <PageHeader name={props.name} />
            {props.children}
        </div>
    )
}