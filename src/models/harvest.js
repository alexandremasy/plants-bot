export default class Harvest{
  /**
   * 
   * @param {Object} args - The harvest information
   * @param {Month} args.start - The start of the harvest
   * @param {Month} args.end - The end of the harvest
   */
  constructor({start, end}){
    this.start = start;
    this.end = end;
  }
}