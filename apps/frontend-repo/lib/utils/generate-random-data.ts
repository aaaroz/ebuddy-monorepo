/**
 * Generates random values for totalAverageWeightRatings and numberOfRents.
 * @param minRating - Minimum value for the average rating (e.g., 1.0).
 * @param maxRating - Maximum value for the average rating (e.g., 5.0).
 * @param minRents - Minimum value for the number of rents (e.g., 0).
 * @param maxRents - Maximum value for the number of rents (e.g., 100).
 * @returns An object containing random values for totalAverageWeightRatings and numberOfRents.
 */
export function generateRandomData(
    minRating: number = 1.0,
    maxRating: number = 5.0,
    minRents: number = 0,
    maxRents: number = 100
): { totalAverageWeightRatings: number; numberOfRents: number } {
    // Generate a random floating-point number for the average rating
    const totalAverageWeightRatings = parseFloat(
        (Math.random() * (maxRating - minRating) + minRating).toFixed(1) // Round to 1 decimal place
    );

    // Generate a random integer for the number of rents
    const numberOfRents = Math.floor(Math.random() * (maxRents - minRents + 1)) + minRents;

    return { totalAverageWeightRatings, numberOfRents };
}
