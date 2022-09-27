/**
 * Header which can display the title of a page.
 * @param {Object} props - The props.
 * @param {string}  props.name - The name of the page.
 */
export function PageHeader({ name }) {
  return (
    <h1 className="text-2xl font-bold md:font-medium leading-7 text-gray-900 sm:text-3xl sm:truncate select-none">
      {name}
    </h1>
  );
}
