const Soil = {};

/**
 * @constant
 */
Soil.All = ['all', 'tous'];

/**
 * @constant
 */
const ALL = [
  Soil.All
];

/**
 * Parse the given value to match against the allowed values
 *
 * @param {String} value 
 * @returns {Array.<String>}
 */
Soil.parse = (value) => {
  return ALL.filter( e => e.includes(value) );
}

export default Soil;