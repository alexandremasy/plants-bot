import got from 'got'
import Parser from 'dom-parser'

export default class SemailleHome {
  constructor() {

  }

  init(){
    return new Promise((resolve, reject) => {
      let qty = 10;
      let url = `https://www.semaille.com/608-potageres?n=${qty}&orderby=name&orderway=asc`
      
      got(url)
      .then(response => {
        let body = response.body;

        let p = new Parser()
        let dom = p.parseFromString(body);

        let items = dom.getElementsByClassName('product_img_link');
        let products = items.map(item => {

          // Title and special chars
          let title = item.getAttribute('title');
          title.split('')
               .map( x => String.fromCharCode(x) )
               .reduce((a, b) => a+b);

          if (title.includes('&#039;')){
            title = title.replace('&#039;', "'")
          }

          // 
          return {
            href: item.getAttribute('href'),
            name: title
          }
        });

        resolve(products);
      })
    })
  }
}