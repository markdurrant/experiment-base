type SeededRNG = () => Number;
type Seed = String;

export const DEFAULT_SEED = "I AM PLANTING SEEDS FOR TOMORROW'S BUG_TREE";

let seed: Seed = DEFAULT_SEED;

/**
 * Get the seed for all seeded random functions.
 * @return seed - The string used to initialize the generator.
 */
export const getSeed = () => {
  return seed;
};

/**
 * Sets the seed for all seeded random functions.
 * @param seedValue - The string used to initialize the generator.
 */
export const setSeed = (seedValue: Seed) => {
  if (!seedValue || typeof seedValue !== "string") {
    throw new Error("setSeed(): seedValue must be a non-empty string.");
  }

  seed = seedValue;
};

/**
 * Get a function for generating deterministic random numbers
 * @return SeededRNG - The RNG() function that will generate random numbers.
 */
export const getSeededRNG = (): SeededRNG => {
  let hash = 0;

  for (let i = 0; i < seed.length; i++) {
    hash = (Math.imul(31, hash) + seed.charCodeAt(i)) | 0;
  }

  const seededRNG = () => {
    hash ^= hash << 13;
    hash ^= hash >>> 17;
    hash ^= hash << 5;

    return ((hash < 0 ? ~hash + 1 : hash) % 1e9) / 1e9;
  };

  return seededRNG;
};
