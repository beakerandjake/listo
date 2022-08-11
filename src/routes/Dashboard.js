import { Button } from 'components/Button';
import { Drawer } from 'components/Drawer';
import { PageHeader } from "components/PageHeader";
import { useState } from "react";

export function Dashboard(props) {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex-1 flex flex-col gap-2">
            <PageHeader name="Dashboard" />
            <div className="flex items-center justify-center">
                <Button text="click" onClick={() => setOpen(true)} />
            </div>
            <Drawer open={open} onClose={() => setOpen(false)} side="bottom" size="lg">
                Hello!
            </Drawer>
        </div>
    )
}