import chalk from 'chalk'
import ora from 'ora'

import SemailleHome from './home.js'

export default class Semaille {

  constructor(){
    this.spinner = ora('Setting up for semaille').start();
    this.products = [];
    this.init()
  }

  init(){
    return new Promise((resolve, reject) => {
      this.spinner.text = 'Fetching semaille\'s products';
      
      let home = new SemailleHome();
      home.init()
      .then((products) => {
        this.spinner.text = `${products.length} products found`;
        // this.spinner.stop();
      })
    })
  }
}