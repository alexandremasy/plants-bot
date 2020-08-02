import chalk from 'chalk'
import ora from 'ora'

import SemailleHome from './home.js'

export default class Semaille {

  constructor(){
    this.init()
  }

  init(){
    return new Promise((resolve, reject) => {
      ora('Fetching Semaille\'s products').start();
      
      let home = new SemailleHome();
      home.init()
      .then((products) => {
        console.log('finish');
      })
    })
  }
}