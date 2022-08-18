import { useState, useEffect } from "react";
import { differenceInMilliseconds } from "date-fns";

const CALLBACK_SPEEDS = [
    // Slow
    {
        fireSpeed: 250,
        minDuration: 1000
    },
    // Medium
    {
        fireSpeed: 100,
        minDuration: 2500
    },
    // Fast
    {
        fireSpeed: 50,
        minDuration: 3500,
    },
];

const MIN_DURATION_FOR_HOLD = 250;

/**
 * After a minimum amount of time has passed from the pressStartTime, the callback will be fired continually
 * at increasing speeds (up to a limit) until the pressStartTime is reset.
 * @param {date} pressStartTime - The time when the press started. 
 * @param {function} callback - Callback invoked on an interval while the press has been maintained long enough.
 */
export function useLongPress(pressStartTime, callback) {
    const [holdStartTime, setHoldStartTime] = useState(null);
    const [callbackSpeedIndex, setCallbackSpeedIndex] = useState(0);

    /**
     * Whenever a press event happens start a timer to see
     * if the user holds down long enough for it to be considered a hold.
     */
    useEffect(() => {
        // When the press is cancelled, reset our state.
        if (!pressStartTime) {
            setHoldStartTime(null);
            setCallbackSpeedIndex(0);
            return;
        }

        const holdTimeout = setTimeout(() => setHoldStartTime(new Date()), MIN_DURATION_FOR_HOLD);

        return () => {
            clearTimeout(holdTimeout);
        }
    }, [pressStartTime]);

    /**
     * While a hold is in progress fire the callback on a set interval.
     */
    useEffect(() => {
        if (!holdStartTime) {
            return;
        }

        const holdInterval = setInterval(() => {
            callback();

            // Increase the interval speed the longer the user has held down.
            if (callbackSpeedIndex < CALLBACK_SPEEDS.length - 1 &&
                differenceInMilliseconds(new Date(), holdStartTime) > CALLBACK_SPEEDS[callbackSpeedIndex].minDuration
            ) {
                setCallbackSpeedIndex(callbackSpeedIndex + 1);
            }

        }, CALLBACK_SPEEDS[callbackSpeedIndex].fireSpeed);

        return () => clearInterval(holdInterval);
    }, [holdStartTime, callbackSpeedIndex, callback]);
}