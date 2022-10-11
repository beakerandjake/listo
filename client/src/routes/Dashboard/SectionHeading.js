/**
 * Header for a section on the dashboard.
 * @param {object} props
 * @param {string} props.title - The title of the section
 */
export const SectionHeading = ({ title }) => {
  return (
    <div className="border-b border-gray-200 pb-3 mb-4">
      <h3 className="text-xl font-medium leading-6 text-gray-900">{title}</h3>
    </div>
  );
};
