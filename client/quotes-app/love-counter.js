import axios from "axios";

export default function LoveCounter() {
    return {
      loveCounter : 0,
      results: {},
      
      init() {
        const love_user = localStorage.getItem('love_user');
        if (love_user !== undefined || love_user !== null){
            this.loveCounter = love_user
        }
        setInterval( () => {
          if (this.loveCounter > 0) {
            this.loveCounter--;
          }
        //  console.log(this.loveCounter)
        }, 5000)
      },
      updateAndGetLoveCounter(){
            const token = localStorage.getItem('token');
            if (token !== undefined || token !== null){
              var url = `http://localhost:3001/api/love_user`
              var getLoveCountUrl = `${url}?token=${token}`

              axios.put(url, {
                token: token
              })
              .then((response) => {
              console.log(response);
              });

              fetch(getLoveCountUrl)
                  .then(r => r.json())
                  .then(result => this.results = result)
                  .then(() => {
                      console.log(this.results);
                      this.loveCounter = this.results.data.love_user
                      // if(this.user.status === 'success'){
                      //     this.info_message = 'Successfully loggedIn'
                      //     this.error = false;
                      //     localStorage.setItem('token', this.user.data)
                      // }else{
                      //     this.info_message = 'Incorrect username or password'
                      //     this.error = false;
                      // }
                  })
                  .catch(error => console.error(error))
            }
          
       },
      love() {
       this.loveCounter++;
        this.updateAndGetLoveCounter();
      },
      hearts() {
         
         if (this.loveCounter <= 0) {
          return "💔"
         }
      
         if (this.loveCounter > 0 && this.loveCounter <= 5) {
           return "💚"
         } else if (this.loveCounter <= 10) {
           return "💚💚";
         } else {
           return "💚💚💚";
         }
      },
      showLoveCounter(){
        const token = localStorage.getItem('token');
        if (token === undefined || token === null){
            return false
        }else{
            return true
        }
      },
    }
}