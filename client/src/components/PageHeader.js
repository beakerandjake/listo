import cx from 'classnames';

/**
 * Header which can display the title of a page.
 * @param {Object} props - The props.
 * @param {string}  props.name - The name of the page.
 */
export function PageHeader({ name, className }) {
  return (
    <h1
      className={cx(
        'text-2xl font-bold md:font-medium leading-7 text-gray-900 sm:text-3xl sm:truncate select-none',
        className
      )}
    >
      {name}
    </h1>
  );
}
