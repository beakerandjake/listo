import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PageHeader } from "components/PageHeader";
import React from "react";
import { getIcon } from "services/iconLibrary";

/**
 * Header for the List page. 
 * @param {Object} props
 * @param {string} props.iconName - Name of the icon to render for the list.
 * @param {function} props.name - Name of the list.
 * @param {React.ReactNode} props.children - Additional items to render in the header.
 */
export function ListPageHeader({
    iconName,
    name,
    children
}) {
    return (
        <div className="flex flex-wrap items-center gap-3 mb-1 sm:mb-3 md:mb-4">
            <FontAwesomeIcon
                icon={getIcon(iconName)}
                size="xl"
                className="text-gray-500 hidden sm:block"
            />
            <PageHeader name={name} />
            {children}
        </div>
    )
}