import cx from 'classnames';
import { DelayedRender } from 'components/DelayedRender';

/**
 * Skeleton placeholder for an items panel
 * @param {object} props
 * @param {boolean} props.collapsed - Should the skeleton mimic a collapsed or expanded panel?
 */
export const ItemsPanelSkeleton = ({ collapsed }) => {
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
