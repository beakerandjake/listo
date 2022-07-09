import React from 'react';
import Error from './Error';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.    
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service    
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {

            return <Error />
            // if (React.isValidElement(this.props.fallback)) {
            //     return this.props.fallback;
            // }

            // throw new Error('Error boundary requires a fallback!');
        }

        return this.props.children;
    }
}