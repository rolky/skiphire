import React from 'react';
import ProgressBar from './ProgressBar';

/**
 * A layout component that wraps content with a consistent header (progress bar) and footer.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered within the layout.
 * @param {number} props.currentStep - The current step for the progress bar (0-indexed).
 */
const PageLayout = ({ children, currentStep }) => {
    return (
        <div className="min-h-screen bg-gray-950 flex flex-col text-white">
            <ProgressBar currentStep={currentStep} />
            <main className="flex-grow py-8 md:py-10 px-4 max-w-7xl mx-auto w-full">
                {children}
            </main>
        </div>
    );
};

export default PageLayout;