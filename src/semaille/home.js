import got from 'got'

export default class SemailleHome {
  constructor() {

  }

  init(){
    return new Promise((resolve, reject) => {
      let qty = 10;
      let url = `https://www.semaille.com/modules/blocklayered/blocklayered-ajax.php?id_category_layered=608&orderby=position&orderway=asc&n=${qty}`
      
      got(url)
      .then(response => {
        console.log('response', response);
      })
    })
  }
}