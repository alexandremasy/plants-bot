import got from 'got'
import Parser from 'dom-parser'

import Plant from '../models/plant.js'
import Exposition from '../models/exposition.js'
import Month from '../models/month.js'

export default class SemailleItem {

  constructor({ name, url }){
    this.name = name;
    this.url = url;
  }

  fetch(){
    return new Promise((resolve, reject) => {
      got(this.url)
      .then(({body}) => {
        let p = new Parser();
        let dom = p.parseFromString(body);

        let plant = new Plant({name: this.name});
        let table = dom.getElementsByClassName('table-data-sheet')[0];
        let trs = table.getElementsByTagName('tr');

        trs.forEach( tr => {
          let tds = tr.getElementsByTagName('td');
          let key = tds[0].textContent.toLowerCase();
          let value = tds[1].textContent;

          switch(key){
            case 'situation':
              plant.exposition = Exposition.parse(value);
              break;
            case 'hauteur':
              plant.sowing.z = value.substring(0, value.length - 2).trim();
              break;
            case 'espacement':
              let t = value.substring(0, value.length - 2)
              let [x, y] = t.split('x');
              plant.sowing.x = x;
              plant.sowing.y = y;
              break;
            case 'date de semis ou de plantation': 
              let [ss, se] = value.split('-');
              plant.sowing.start = Month.parse(ss);
              plant.sowing.end = Month.parse(se);
              break;
            case 'date de floraison':
              let [hs, he] = value.split('-');
              plant.harvest.start = Month.parse(hs);
              plant.harvest.end = Month.parse(he);
              break;
            case 'nom latin':
              plant.latinName = value;
              break;

            case 'légume insolite':
            case 'poids net en gr':
            case 'graines par gr':
            case 'producteur':
              break;
            default: 
              console.log('unhandled key', key);
              break;
          }
        });

        console.log('plant', plant);

        process.exit();
      })  
    })
  }
}