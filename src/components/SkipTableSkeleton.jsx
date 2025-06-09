import React from 'react';

/**
 * Renders a skeleton loading state for the SkipSelectionTable.
 * It mimics the table's structure with pulsating placeholder elements.
 */
const SkipTableSkeleton = () => {
    // Number of rows to display in the skeleton table
    const numRows = 4; // You can adjust this number as needed

    // Array to easily map and render multiple skeleton rows
    const skeletonRows = Array.from({ length: numRows }, (_, i) => i);

    return (
        <div className="card bg-gray-800 p-4 rounded-lg shadow-xl mb-10">
            {/* Mimics the table title */}
            <div className="h-8 bg-gray-700 rounded w-2/3 mx-auto mb-6 animate-pulse"></div>

            {/* Skeleton table container */}
            <div className="space-y-4">
                {skeletonRows.map((_, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center bg-gray-700/50 p-3 rounded-lg animate-pulse"
                    >
                        {/* Image Column */}
                        <div className="md:col-span-1 flex justify-center">
                            <div className="h-20 w-20 bg-gray-600 rounded-lg"></div>
                        </div>

                        {/* Skip Size Column */}
                        <div className="md:col-span-1 flex justify-center md:justify-start">
                            <div className="h-6 w-24 bg-gray-600 rounded"></div>
                        </div>

                        {/* Hire Period Column */}
                        <div className="md:col-span-1 flex justify-center">
                            <div className="h-6 w-20 bg-gray-600 rounded"></div>
                        </div>

                        {/* Allowed On Road Column */}
                        <div className="md:col-span-1 flex justify-center">
                            <div className="h-6 w-16 bg-gray-600 rounded"></div>
                        </div>

                        {/* Allows Heavy Waste Column */}
                        <div className="md:col-span-1 flex justify-center">
                            <div className="h-6 w-20 bg-gray-600 rounded"></div>
                        </div>

                        {/* Price Column */}
                        <div className="md:col-span-1 flex justify-center md:justify-end">
                            <div className="h-8 w-28 bg-gray-600 rounded"></div>
                        </div>

                        {/* Select Button Column */}
                        <div className="md:col-span-1 flex justify-center">
                            <div className="h-9 w-24 bg-gray-600 rounded-md"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkipTableSkeleton;

