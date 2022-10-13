import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import cx from 'classnames';
import { Badge } from 'components/Badge';
import { Fade } from 'components/Transition';
import { SectionHeader } from './SectionHeader';

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
    <SectionHeader
      title={title}
      badge={<Badge variant={badgeVariant}>{badgeCount}</Badge>}
      addOns={
        <FontAwesomeIcon
          icon={faChevronDown}
          className={cx('transition-transform', { 'rotate-180': open })}
        />
      }
      onClick={onClick}
    />
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
