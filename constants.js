/**
 * A mapping of sphere IDs to location IDs.
 * Each key represents a sphere ID, and the corresponding value represents the location ID.
 *
 * @constant {Object<number, number>}
 */
export const sphereToLocation = {
  5: 1,
  8: 2,
  6: 3,
  11: 4,
  9: 5,
  13: 6,
  14: 7,
  31: 8,
  29: 9,
  17: 10,
  27: 11,
  48: 12,
  49: 12,
  50: 12,
  42: 13,
  43: 13,
  44: 13,
  45: 13,
  46: 13,
  47: 13,
  38: 14,
  35: 15,
  25: 16,
  23: 17,
  21: 18,
  0: 19,
};

/**
 * A reverse mapping of location IDs to arrays of sphere IDs.
 * Each key represents a location ID, and the corresponding value is an array of sphere IDs.
 *
 * @constant {Object<number, number[]>}
 */
export const locationToSphere = {};

for (const [sphere, location] of Object.entries(sphereToLocation)) {
  if (!locationToSphere[location]) {
    locationToSphere[location] = [];
  }
  locationToSphere[location].push(parseInt(sphere));
  locationToSphere[location].sort();
}
