import './style.css'
import './quote.css'
import Alpine from 'alpinejs'
import LoveCounter from './love-counter';
import Quotes from './quotes';
 
window.Alpine = Alpine

Alpine.data('loveCounter', LoveCounter);

Alpine.data('quoteApp', Quotes);

Alpine.start();


// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `

document.querySelector('#app').innerHTML = "I 💚 Alpine JS!"
