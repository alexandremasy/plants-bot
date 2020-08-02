import Sowing from './sowing.js'
import Harvest from './harvest.js'

export default class Plant{
  /**
   * @constructor
   * @param {Object} args - The plant information
   * @param {String} args.name - The name of the plant
   * @param {String} args.latinName - The latin name of the plant
   * @param {Sowing} args.sowing - The sowing information
   * @param {Harvest} args.harvest - The harvest information
   * @param {Array.<String>} args.exposition - The prefered exposition(s)
   */
  constructor({ latinName, name, sowing = new Sowing({}), harvest = new Harvest({}), exposition }){
    this.latinName = latinName;
    this.name = name;

    this.sowing = sowing;
    this.harvest = harvest;

    this.exposition = exposition;
  }
}