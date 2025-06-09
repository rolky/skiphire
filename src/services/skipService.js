
const BASE_URL =  'https://app.wewantwaste.co.uk/api';

/**
 * Fetches skip data for a given postcode and area.
 * @param {string} postcode - The postcode for the location.
 * @param {string} area - The area name for the location.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of skip objects.
 * @throws {Error} If the API call fails or returns a non-OK status.
 */
export const getSkipsByLocation = async (postcode, area) => {
    try {
        const response = await fetch(`${BASE_URL}/skips/by-location?postcode=${encodeURIComponent(postcode)}&area=${encodeURIComponent(area)}`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const errorMessage = errorData?.message || `HTTP error! status: ${response.status}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching skip data:", error);
        if (error.message.includes('Failed to fetch')) {
            throw new Error("Network error: Could not connect to the server. Please check your internet connection.");
        }
        throw new Error(`Failed to load skip options: ${error.message}. Please try again later.`);
    }
};
