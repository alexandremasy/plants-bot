/**
 * Month
 * 
 * @class
 */
class Month {
  /**
   * @constructor
   * @param {Array.<String>} labels  
   * @param {Number} integer
   */
  constructor(labels, integer){
    this.labels = labels;
    this.integer = integer;
  }

  /**
   * Parse the given value to match against the allowed values
   * 
   * @param {String} value
   * @returns {Month}
   * @static
   */
  static parse = (value) => {
    return ALL.find(e => e.labels.includes(value))
  }

  /**
   * @returns {String}
   */
  toString(){
    return this.labels[0];
  }

  /**
   * @returns {Number}
   */
  toNumber(){
    return this.integer;
  }
}

/**
 * @constant
 */
const January = new Month(['january', 'janvier'], 0);

/**
 * @constant
 */
const February = new Month(['february', 'fevrier', 'février'], 1);

/**
 * @constant
 */
const March = new Month(['march', 'mars'], 2);

/**
 * @constant
 */
const April = new Month(['april', 'avril'], 3);

/**
 * @constant
 */
const Mai = new Month(['mai'], 4);

/**
 * @constant
 */
const June = new Month(['june', 'juin'], 5);

/**
 * @constant
 */
const July = new Month(['july', 'juillet'], 6);

/**
 * @constant
 */
const August = new Month(['august', 'aout', 'août'], 7);

/**
 * @constant
 */
const September = new Month(['september', 'septembre'], 8);

/**
 * @constant
 */
const October = new Month(['october', 'octobre'], 9);

/**
 * @constant
 */
const November = new Month(['november', 'novembre'], 10);

/**
 * @constant
 */
const December = new Month(['december', 'decembre', 'décembre'], 11);

/**
 * @constant
 */
const ALL = [
  January,
  February,
  March,
  April,
  Mai,
  June,
  July,
  August,
  September,
  October,
  November,
  December
];


export default Month