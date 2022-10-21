import { DelayedRender } from 'components/DelayedRender';
import { Fade } from 'components/Transition';

/**
 * Skeleton placeholder for an ItemsCard
 * @param {object} props
 */
export const ItemsCardSkeleton = () => {
  return (
    <DelayedRender>
      <Fade in appear>
        <div>
          <div className="flex items-center gap-2 animate-pulse rounded-lg h-16 bg-slate-200 p-2">
            <div className="bg-slate-300 w-24 h-8 rounded-lg"></div>
            <div className="bg-slate-300 w-8 h-8 rounded-full"></div>
          </div>
        </div>
      </Fade>
    </DelayedRender>
  );
};
