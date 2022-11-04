import { Card, CardContent } from 'components/Card';
import { DelayedRender } from 'components/DelayedRender';

/**
 * Skeleton for a Stat Card.
 */
export const StatCardSkeleton = () => {
  return (
    <DelayedRender>
      <Card className="select-none max-w-sm">
        <CardContent className="flex items-center justify-between bg-slate-200 animate-pulse">
          {/* Content */}
          <div className="flex flex-col gap-2">
            <div className="bg-slate-300 w-32 h-5 rounded-lg" />
            <div className="bg-slate-300 w-48 h-8 rounded-lg" />
          </div>
          {/* Icon */}
          <div className="bg-slate-300 w-12 h-12 rounded-lg" />
        </CardContent>
      </Card>
    </DelayedRender>
  );
};
