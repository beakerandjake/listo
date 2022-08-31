import { Badge } from 'components/Badge';
import { Pill, PillGroup } from 'components/PillGroup';
import { useState } from 'react';
import { PopIn, SwitchTransition } from 'components/Transition';


export const ListTabGroup = ({ children }) => {
    const [activePill, setActivePill] = useState('Active');
    const [items, setItems] = useState([
        { name: 'Active', count: 7 },
        { name: 'Complete', count: 4 },
    ]);

    return (
        <PillGroup>
            {items.map(x => (
                <div key={x.name}>
                    <SwitchTransition switchKey={x.count} as={PopIn}>
                        <div>
                            <Pill key={x.name} active={x.name === activePill} onClick={() => setActivePill(x.name)}>
                                {x.name}
                                <Badge
                                    size="lg"
                                    variant={x.name === activePill ? 'inverse' : 'default'}
                                >
                                    {x.count}
                                </Badge>
                            </Pill>
                        </div>
                    </SwitchTransition>
                </div>
            ))}
        </PillGroup>
    );
};