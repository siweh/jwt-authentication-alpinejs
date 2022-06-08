import * as fun from 'everyday-fun';

export default function Quotes() {
    return {
      init() {
       this.getQuote();
      },
      quote : {},
      getQuote(){
        this.quote = fun.getRandomQuote()
      },
    }
}