import React from 'react';
import DeleteNotification from './DeleteNotification';

export default function DeleteNotificationPanel(props) {
    return (
        <div className="fixed inset-0 flex items-end px-4 py-6 sm:p-6 pointer-events-none sm:static">
            <div className="w-full flex flex-col items-center space-y-4">
                {props.lastDeleted &&
                    <DeleteNotification
                        name={props.lastDeleted.name}
                        onUndo={() => console.log('undo')}
                        onDismiss={() => console.log('dismiss')}
                    />}
            </div>
        </div>
    );
}