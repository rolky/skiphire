import React from 'react';
import { FaMapMarkerAlt, FaRecycle, FaDumpster, FaClipboardCheck, FaCalendarAlt, FaCreditCard } from 'react-icons/fa';

/**
 * Renders a progress bar indicating the current step in a multi-step process.
 * @param {object} props - The component props.
 * @param {number} props.currentStep - The index of the current active step (0-indexed).
 */
const ProgressBar = ({ currentStep }) => {
    const steps = [
        { label: "Postcode", icon: FaMapMarkerAlt },
        { label: "Waste Type", icon: FaRecycle },
        { label: "Select Skip", icon: FaDumpster },
        { label: "Permit Check", icon: FaClipboardCheck },
        { label: "Choose Date", icon: FaCalendarAlt },
        { label: "Payment", icon: FaCreditCard },
    ];

    return (
        <nav className="bg-gray-800 p-4 border-b border-gray-700 shadow-md">
            <div className="container mx-auto flex flex-wrap justify-between items-center text-sm font-medium w-full">
                {steps.map((step, index) => (
                    <React.Fragment key={step.label}>
                        <div className="flex items-center space-x-2 my-2 md:my-0">
                            <span className={`rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold
                                ${index <= currentStep ? 'bg-cyan-600 text-white' : 'bg-gray-600 text-white'}
                            `}>
                                <step.icon size={14} />
                            </span>
                            <span className={`${index <= currentStep ? 'text-cyan-400 hidden md:block' : 'text-gray-400 hidden md:block'}`}>
                                {step.label}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`flex-grow border-t-2 mx-2 md:mx-4 
                                ${index < currentStep ? 'border-cyan-600' : 'border-gray-700'}
                            `}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </nav>
    );
};

export default ProgressBar;