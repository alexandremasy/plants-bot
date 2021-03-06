import got from 'got'
import Parser from 'dom-parser'

import Plant from '../models/plant.js'
import Exposition from '../models/exposition.js'
import Month from '../models/month.js'
import Soil from '../models/soil.js'

export default class SemailleItem {

  constructor({ name, url }){
    this.name = name;
    this.url = url;
  }

  fetch(cb){
    return new Promise((resolve, reject) => {
      got(this.url)
      .then(response => {
        let body = response.body;

        try{
          let p = new Parser();
          let dom = p.parseFromString(body);

          let category = this.url.split('/');
          category = category[3]

          let plant = new Plant({category, name: this.name, url: this.url});
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
                plant.sowing.z = value.substring(0, value.length - 2).trim() | 0;
                break;
              case 'espacement':
                if (value.includes('cm')){
                  value = value.substring(0, value.length - 2);
                }
  
                let [x, y] = value.split('x');
  
                if (x.includes('m')){
                  x = x.substr(0, x.length-1);
                  x = (x | 0) * 100;
                }
                
                if (y.includes('m')){
                  y = y.substr(0, y.length-1);
                  y = (y | 0) * 100;
                }
  
                plant.sowing.x = x | 0;
                plant.sowing.y = y | 0;
                break;
              case 'date de semis ou de plantation': 
                let [ss, se] = value.split('-');
                plant.sowing.start = Month.parse(ss);
                plant.sowing.end = Month.parse(se);
                break;
              case 'date de floraison':
              case 'date de récolte':
                let [hs, he] = value.split('-');
                plant.harvest.start = Month.parse(hs);
                plant.harvest.end = Month.parse(he);
                break;
              case 'nom latin':
                plant.latinName = value;
                break;
              case 'type de sol':
                plant.soil = Soil.parse(value);
                break;
              case 'densité de semis': 
                plant.sowing.density = value;
                break;
  
              case 'légume insolite':
              case 'poids net en gr':
              case 'graines par gr':
              case 'nbre de graines par sachet':
              case 'producteur':
              case 'type de culture': 
              case 'rendement en kg':
              case 'culture en pot': 
              case 'patrimoine légumier régional':
              case 'variété coureuse':
              case 'couleur': 
              case 'variété buissonnante': 
              case 'durée de culture':
              case 'sans acidité':
              case 'chair':
              case 'plante mellifère': 
              case 'fleur comestible':
                break;
              default: 
                console.log('unhandled key', key, this.name);
                console.log(this.url);
                break;
            }
          });

          cb();
          resolve(plant);
        }
        catch(err){
          cb();
          resolve(null);
        }
      })  
      .catch(err => {
        console.log('Error', err);
        console.log('name', this.name);
        console.log('url', this.url);
        cb();
        resolve(null);
      })
    })
  }
}