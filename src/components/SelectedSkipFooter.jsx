import React from 'react';
import { Button } from 'primereact/button';

/**
 * Renders a sticky footer displaying details of the selected skip and continue/back buttons.
 * @param {object} props - The component props.
 * @param {object | null} props.selectedSkip - The currently selected skip object.
 * @param {function} props.onContinue - Callback function when the continue button is clicked.
 * @param {function} [props.onBack] - Optional callback function when the back button is clicked.
 */
const SelectedSkipFooter = ({ selectedSkip, onContinue, onBack }) => {
    if (!selectedSkip) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-gray-900 border-t border-gray-700 py-3 px-4 shadow-2xl text-gray-400 text-sm">
            {/* Disclaimer text from screenshots */}
            <p className="text-center mb-2 px-4">
                Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.
            </p>
            <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center py-2">
                <div className="mb-2 md:mb-0 text-center md:text-left flex items-center w-full md:w-auto justify-between">
                    {/* Skip details aligned as per screenshot */}
                    <span className="text-white font-semibold text-lg md:text-xl">
                        {selectedSkip.size} Yard Skip
                    </span>
                    <span className="text-cyan-400 font-bold text-xl md:text-2xl md:ml-4">
                        £{selectedSkip.finalPrice.toFixed(2)}
                    </span>
                    {/* Assuming hire_period_days is available in selectedSkip */}
                    {selectedSkip.hire_period_days && (
                        <span className="text-white text-md md:text-lg ml-2">
                            {selectedSkip.hire_period_days} days
                        </span>
                    )}
                </div>

                <div className="flex justify-end gap-3 w-full md:w-auto mt-3 md:mt-0">
                    {onBack && (
                        <Button
                            label="Back"
                            onClick={onBack}
                            className="p-button-lg p-button-secondary bg-gray-700 hover:bg-gray-600 border-none transition-colors duration-200"
                            aria-label="Go back to previous step"
                        />
                    )}
                    <Button
                        label="Continue"
                        icon="pi pi-arrow-right"
                        iconPos="right"
                        onClick={onContinue}
                        className="p-button-lg p-button-primary bg-blue-600 hover:bg-blue-700 border-none transition-colors duration-200"
                        aria-label="Continue to Delivery Details"
                    />
                </div>
            </div>
        </div>
    );
};

export default SelectedSkipFooter;