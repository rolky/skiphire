import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import SkipTableSkeleton from "./SkipTableSkeleton"; // Ensure this path is correct

/**
 * Renders a table for selecting skip sizes.
 * @param {object} props - The component props.
 * @param {Array<object>} props.skips - An array of skip objects to display.
 * @param {object | null} props.selectedSkip - The currently selected skip object.
 * @param {function} props.onSkipSelect - Callback function when a skip is selected/deselected.
 * @param {boolean} props.loading - Indicates if the data is currently loading.
 * @param {string | null} props.error - An error message to display.
 */
const SkipSelectionTable = ({
  skips,
  selectedSkip,
  onSkipSelect,
  loading,
  error,
}) => {
  console.log("Rendering SkipSelectionTable with skips:", selectedSkip);
  const imageBodyTemplate = (rowData) => (
    <div className="flex justify-center items-center p-2">
      <Image
        src={rowData.imageUrl}
        alt={`${rowData.size} yard skip`}
        width="80"
        preview
        onError={(e) => {
          e.target.src = "/placeholder-skip.png";
        }}
        className="rounded-lg shadow-md"
      />
    </div>
  );

  const skipSizeBodyTemplate = (rowData) => (
    <div className="text-white font-semibold text-lg py-2">
      {rowData.size} Yards
    </div>
  );

  const hirePeriodBodyTemplate = (rowData) => (
    <span className="text-white text-base md:text-lg">
      {rowData.hire_period_days} days
    </span>
  );

  const allowedOnRoadBodyTemplate = (rowData) => (
    <div className="flex justify-center items-center">
      {rowData.allowed_on_road ? (
        <FaCheckCircle
          className="text-green-500 text-xl"
          title="Allowed on Road: Yes"
        />
      ) : (
        <FaTimesCircle
          className="text-red-500 text-xl"
          title="Allowed on Road: No"
        />
      )}
      <span className="ml-2 text-white hidden md:inline">
        {rowData.allowed_on_road ? "Yes" : "No"}
      </span>
    </div>
  );

  const allowsHeavyWasteBodyTemplate = (rowData) => (
    <div className="flex justify-center items-center">
      {rowData.allows_heavy_waste ? (
        <FaCheckCircle
          className="text-green-500 text-xl"
          title="Allows Heavy Waste: Yes"
        />
      ) : (
        <FaTimesCircle
          className="text-red-500 text-xl"
          title="Allows Heavy Waste: No"
        />
      )}
      <span className="ml-2 text-white hidden md:inline">
        {rowData.allows_heavy_waste ? "Yes" : "No"}
      </span>
    </div>
  );

  const priceBodyTemplate = (rowData) => (
    <span className="text-cyan-400 font-bold text-xl md:text-2xl">
      £{rowData.finalPrice.toFixed(2)}
    </span>
  );

  const selectBodyTemplate = (rowData) => {
    const isSelected = selectedSkip?.id === rowData.id;
    return (
      <Button
        label={isSelected ? "SELECTED" : "SELECT"}
        icon={isSelected ? <FaCheckCircle className="mr-2" /> : null}
        className={` p-button-sm font-bold transition-all duration-200 ease-in-out
                    ${
                      isSelected
                        ? "p-button-success"
                        : "p-button-secondary bg-gray-700 hover:bg-gray-600 border-none"
                    }
                `}
        onClick={() => onSkipSelect(rowData)}
        aria-label={
          isSelected
            ? `Selected ${rowData.size} yard skip`
            : `Select ${rowData.size} yard skip`
        }
      />
    );
  };

  if (loading) {
    return (
      <div className="">
        <SkipTableSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 py-8">
        <p>{error}</p>
        <p className="text-sm text-gray-500 mt-2">
          Please refresh the page or try again later.
        </p>
      </div>
    );
  }

  if (skips.length === 0 && !loading && !error) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p>No skips available for your location at the moment.</p>
        <p className="text-sm mt-2">
          Try a different postcode or contact support.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white  text-center mb-2">
          Choose Your Skip Size
        </h2>
        <div className=" text-gray-400 mb-6 text-center">
          Select the skip size that best suits your needs
        </div>
      </div>
      <div className="card bg-gray-800 p-4 rounded-lg shadow-xl mb-10">
        <DataTable
          key={selectedSkip?.id}
          value={skips}
          dataKey="id"
          responsiveLayout="stack"
          breakpoint="960px"
          className="p-datatable-gridlines p-datatable-striped"
          selectionMode="single" // Optional: Visualizes single selection if needed
          selection={selectedSkip} // Optional: Binds the selection state to DataTable
          onRowClick={(e) => onSkipSelect(e.data)} // Make the whole row clickable!
          rowClassName={
            (rowData) =>
              selectedSkip?.id === rowData.id
                ? "bg-blue-900/30 border-4 border-cyan-400 shadow-lg cursor-pointer" // Added cursor-pointer
                : "hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer" // Added cursor-pointer
          }
        >
          <Column
            header="Image"
            body={imageBodyTemplate}
            className=" md:w-1/6"
          />
          <Column
            header="Skip Size"
            body={skipSizeBodyTemplate}
            className="w-auto md:w-1/6"
          />
          <Column
            header="Hire Period"
            body={hirePeriodBodyTemplate}
            className="w-auto md:w-1/6 text-center"
          />
          <Column
            header="On Road"
            body={allowedOnRoadBodyTemplate}
            className="w-auto md:w-1/6 text-center"
          />
          <Column
            header="Heavy Waste"
            body={allowsHeavyWasteBodyTemplate}
            className="w-auto md:w-1/6 text-center"
          />
          <Column
            header="Price (Inc. VAT)"
            body={priceBodyTemplate}
            className="w-auto md:w-1/6 text-right"
          />
          <Column
            header="Select"
            body={selectBodyTemplate}
            className="w-auto md:w-1/6 text-center"
          />
        </DataTable>
      </div>
    </div>
  );
};

export default SkipSelectionTable;
