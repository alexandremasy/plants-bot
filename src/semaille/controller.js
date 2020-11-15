import ora from 'ora'
import fs from 'fs'

import SemailleHome from './home.js'
import SemailleItem from './item.js'

export default class Semaille {

  constructor(){
    this.spinner = ora('[semaille] - Setup').start();
    this.products = [];
    this.init()
  }

  init(){
    return new Promise((resolve, reject) => {
      this.fetchHome()
      .then(this.fetchProducts.bind(this))
      .then(this.output.bind(this))
      .then(products => {
        this.spinner.succeed(`[semaille] - Fetched ${products.length} products`);
      })
    })
  }
  
  /**
   * Find all the products from the products list
   * @returns {Promise} A promise of Array<{name, url}>
   */
  fetchHome(){
    this.spinner.succeed();
    this.spinner.start('[semaille] - Listing items');

    let qty = 999
    let home = new SemailleHome();
    return home.init({ qty });
  }
  
  /**
   * Fetch all the products features
   * 
   * @param {Array<{name, url}} products - The list of product to fetch
   * @returns {Promise} A promise of Array<Products> 
   */
  fetchProducts( products ){
    let n = products.length;
    let i = 0;
    this.spinner.succeed();
    this.spinner.start(`[semaille] - Fetching items [${i}/${n}]`);
    
    const increment = () => { 
      i++; 
      this.spinner.text = `[semaille] - Fetching items [${i}/${n}]`;
    } 

    return new Promise((resolve, reject) => {
      Promise.all( products.map(p => new SemailleItem(p).fetch(increment)) )
      .then(products => {
        products = products.filter( p => p !== null );
        resolve(products);
      })
    })
  }

  /**
   * Output the list of product to a json format for the frontend app
   * 
   * @param {Array<Products>} products 
   * @returns {Promise}
   */
  output( products ){
    return new Promise((resolve, reject) => {
      let data = JSON.stringify(products)
      fs.writeFile('semaille.json', data, 'utf8', (err) => {
        if (err){
          return reject(err)
        }

        return resolve(products)
      })
    })
  }
}