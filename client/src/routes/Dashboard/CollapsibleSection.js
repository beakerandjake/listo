import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import cx from 'classnames';
import { Badge } from 'components/Badge';
import { Fade } from 'components/Transition';

/**
 * Header for a collapsible section.
 * @param {object} props
 * @param {string} props.title - Text of the header
 * @param {boolean} props.open - Is the section currently expanded?
 * @param {number} props.badgeCount - Count to render in the badge.
 * @param {string} props.badgeVariant - Badge variant name.
 * @param {function} props.onClick - Callback invoked when the user clicks on the header.
 */
const CollapsibleSectionHeader = ({
  title,
  open,
  badgeCount,
  badgeVariant,
  onClick,
}) => {
  return (
    <div
      className="border-b border-gray-200 pb-5 flex items-center justify-between cursor-pointer select-none"
      onClick={onClick}
    >
      <div className="flex gap-2">
        <h3 className="mr-2 text-lg font-medium leading-6 text-gray-900">
          {title}
        </h3>
        <Badge variant={badgeVariant}>{badgeCount}</Badge>
      </div>
      <FontAwesomeIcon
        icon={faChevronDown}
        className={cx('transition-transform', { 'rotate-180': open })}
      />
    </div>
  );
};

/**
 * Collapsible area for displaying dashboard content.
 * @param {object} props
 * @param {string} props.title - Text of the header
 * @param {number} props.badgeCount - Number of items to render in the badge.
 * @param {string} props.variant - Badge variant name.
 */
export const CollapsibleSection = ({
  title = '',
  badgeCount = 0,
  defaultOpen = false,
  children,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-5">
      {/* Heading */}
      <CollapsibleSectionHeader
        title={title}
        badgeCount={badgeCount}
        open={open}
        onClick={() => setOpen(!open)}
      />
      {/* Body */}
      {open && (
        <Fade in={open} appear>
          <div className="py-4">{children}</div>
        </Fade>
      )}
    </div>
  );
};
