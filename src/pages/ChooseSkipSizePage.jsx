import React, { useState, useEffect } from "react";
import { getSkipsByLocation } from "../services/skipService"; // Ensure this path is correct
import SkipSelectionTable from "../components/SkipSelectionTable"; // Ensure this path is correct
import SelectedSkipFooter from "../components/SelectedSkipFooter"; // Ensure this path is correct
import PageLayout from "../layouts/PageLayout"; // Ensure this path is correct

function ChooseSkipSizePage() {
    const [skips, setSkips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSkip, setSelectedSkip] = useState(null);

    const postcode = "NR32";
    const area = "Lowestoft";
    const IMAGE_BASE_URL = "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/";

    useEffect(() => {
        const fetchSkips = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getSkipsByLocation(postcode, area);

                const skipsWithCalculatedData = data.map((skip) => {
                    const finalPrice = skip.price_before_vat * (1 + skip.vat / 100);
                    const imageUrl = `${IMAGE_BASE_URL}${skip.size}-yarder-skip.jpg`;

                    return {
                        ...skip,
                        finalPrice,
                        imageUrl,
                        selectedQuantity: 1,
                    };
                });

                setSkips(skipsWithCalculatedData);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching skips:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSkips();
    }, [postcode, area]);

   
    /**
     * Handles the selection/deselection of a skip.
     * If the clicked skip is already selected, it deselects it.
     * Otherwise, it selects the clicked skip.
     * @param {object} skip - The skip object to select/deselect.
     */
    const handleSkipSelect = (skip) => {
        setSelectedSkip(prev => (prev?.id === skip.id ? null : skip));
    };


    const handleContinue = () => {
        if (selectedSkip) {
            const totalCost = (selectedSkip.finalPrice * selectedSkip.selectedQuantity).toFixed(2);
            alert(`Proceeding with: ${selectedSkip.size} Yard Skip. Total: £${totalCost}`);
            console.log("Selected Skip for next step:", selectedSkip);

        } else {
            alert("Please select a skip size to continue.");
        }
    };

    return (
        <PageLayout currentStep={2}>
            <div className="py-4 md:py-8">
                <SkipSelectionTable
                    skips={skips}
                    selectedSkip={selectedSkip}
                    onSkipSelect={handleSkipSelect}
                    loading={loading}
                    error={error}
                />
            </div>
            <SelectedSkipFooter
                selectedSkip={selectedSkip}
                onContinue={handleContinue}
            />
        </PageLayout>
    );
}

export default ChooseSkipSizePage;