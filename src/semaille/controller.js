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

    products.length = 1;

    Promise.all( products.map(p => {
      let item = new SemailleItem(p);
      return item.fetch();
    }))
    .then(products => {
      console.log('done');
    })
  }
}