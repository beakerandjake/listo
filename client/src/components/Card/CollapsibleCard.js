import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import cx from 'classnames';
import { Card } from './Card';
import { CardHeader } from './CardHeader';
import { Fade } from 'components/Transition';

/**
 * Card with a collapsible body.
 * @param {object} props
 * @param {boolean} props.defaultOpen - Initial collapsed state of the card.
 * @param {ReactNode} props.header - Content of the Cards Header.
 * @param {ReactNode} props.children - Content of the.
 */
export const CollapsibleCard = ({
  defaultOpen,
  header,
  children,
  ...props
}) => {
  const [open, setOpen] = useState(!!defaultOpen);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <Card {...props}>
      {/* Header */}
      <CardHeader onClick={toggle} className="cursor-pointer select-none">
        <div className="flex items-center justify-between">
          {header}
          <FontAwesomeIcon
            icon={faChevronDown}
            className={cx('transition-transform', { 'rotate-180': open })}
          />
        </div>
      </CardHeader>
      {/* Body */}
      {open && (
        <Fade in={open} appear>
          <div>{children}</div>
        </Fade>
      )}
    </Card>
  );
};
