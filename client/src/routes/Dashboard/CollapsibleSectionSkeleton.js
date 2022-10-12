import cx from 'classnames';
import { DelayedRender } from 'components/DelayedRender';

/**
 * Skeleton placeholder for a collapsible section
 * @param {object} props
 * @param {boolean} props.collapsed - Should the skeleton mimic a collapsed or expanded section?
 */
export const CollapsibleSectionSkeleton = ({ collapsed }) => {
  return (
    <DelayedRender>
      <div
        className={cx(
          'flex flex-col gap-2 animate-pulse bg-slate-200 rounded-lg',
          collapsed ? 'h-16' : 'h-48'
        )}
      />
    </DelayedRender>
  );
};
