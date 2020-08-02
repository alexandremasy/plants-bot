const Exposition = {}

/**
 * @constant
 */
Exposition.Sun = ['sun', 'ensoleillée', 'ensoleillee']

/**
 * @constant
 */
Exposition.Shades = ['shades', 'ombragé']

/**
 * @constant
 */
Exposition.MiShades = ['mi-shades', 'mi-ombre']

/**
 * @constant
 */
Exposition.ALL = [
  Exposition.Sun,
  Exposition.Shades,
  Exposition.MiShades
];

/**
 * Parse the given value to match against the allowed values
 * 
 * @param {String} value
 * @returns {Array.<String>}
 */
Exposition.parse = (value) => {
  return Exposition.ALL.filter( e => e.filter(item => value.includes(item)).length > 0)
}

export default Exposition