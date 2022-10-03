import { Button } from 'components/Button';
import { Drawer } from 'components/Drawer';
import { PageHeader } from 'components/PageHeader';
import { useState } from 'react';

export function Dashboard(props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex-1 flex flex-col gap-2">
      <PageHeader name="Dashboard" />
      <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
    </div>
  );
}
