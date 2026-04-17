export const toSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

/**
 * Finds the closest matching feature name using Levenshtein distance.
 * Also handles word-order variations by comparing sorted word sets.
 * @param {string} input - The user's input string
 * @param {Array} features - GeoJSON features array
 * @param {function} getName - Function to extract the name from a feature, e.g. f => f.properties.st_nm
 * @returns {string|null} The closest matching name, or null if no close match found
 */
export const findClosestFeature = (input, features, getName) => {
  if (!features?.length) return null;

  const levenshtein = (a, b) => {
    const dp = Array.from({ length: a.length + 1 }, (_, i) =>
      Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
    );
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++)
        dp[i][j] =
          a[i - 1] === b[j - 1]
            ? dp[i - 1][j - 1]
            : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    return dp[a.length][b.length];
  };

  const sortWords = (str) => str.split(/\s+/).sort().join(" ");
  const lower = input.trim().toLowerCase();
  const lowerSorted = sortWords(lower);

  let best = null;
  let bestDist = Infinity;

  features.forEach((f) => {
    const name = getName(f).toLowerCase();
    const nameSorted = sortWords(name);
    // Use the smaller of normal vs word-sorted distance
    const dist = Math.min(levenshtein(lower, name), levenshtein(lowerSorted, nameSorted));
    if (dist < bestDist) { bestDist = dist; best = getName(f); }
  });

  return bestDist <= Math.max(3, Math.floor(lower.length / 3)) ? best : null;
};
