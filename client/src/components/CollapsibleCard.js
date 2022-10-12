import { Disclosure } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import cx from 'classnames';

/**
 * Header section of the card
 * @param {object} props
 * @param {string} props.title - The title of the card.
 * @param {boolean} props.open - Is the parent collapsible currently open?
 * @param {ReactNode} props.children - Additional elements to render in the header.
 */
const CardHeader = ({ title, open }) => {
  return (
    <div
      className={cx('px-4 py-5 sm:px-6 cursor-pointer', {
        'border-b border-gray-300': open,
      })}
    >
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {title}
          </h3>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          <FontAwesomeIcon
            icon={faChevronDown}
            className={cx('transition-transform', { 'rotate-180': open })}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Card with a collapsible body.
 * @param {object} props
 * @param {string} props.title - The title of the card.
 * @param {boolean} props.defaultOpenState - Should the card default to being opened?
 * @param {ReactNode} props.children - The child element to render.
 */
export const CollapsibleCard = ({ title, defaultOpen = false, children }) => {
  return (
    <Disclosure
      as="div"
      defaultOpen={defaultOpen}
      className="overflow-hidden rounded-lg bg-white shadow border border-gray-300"
    >
      {({ open }) => (
        <>
          <Disclosure.Button title={open ? 'Close Panel' : 'Open Panel'} className="w-full">
            <CardHeader title={title} open={open}></CardHeader>
          </Disclosure.Button>
          <Disclosure.Panel className="bg-gray-50 px-4 py-5 sm:p-6">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
