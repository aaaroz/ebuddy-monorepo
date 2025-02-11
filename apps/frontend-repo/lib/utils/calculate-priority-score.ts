export function calculatePriorityScore(
    totalAverageWeightRatings: number,
    numberOfRents: number,
    recentlyActive: number,
): number {
    return (
        totalAverageWeightRatings * 1000000 +
        numberOfRents * 1000 +
        recentlyActive / 1000
    );
}
