import ora from 'ora'

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
      .then(products => {
        this.spinner.succeed(`[semaille] - Fetched ${products.length} products`);
      })
    })
  }
  
  fetchHome(){
    this.spinner.succeed();
    this.spinner.start('[semaille] - Listing items');
    
    let home = new SemailleHome();
    return home.init();
  }
  
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
}