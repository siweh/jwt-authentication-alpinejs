export default function LoginApiEndpoint(){
    return{
        init() {
            this.loginApiEndpoint();
            //Check if localStorage has token, take user to homepage
            const token = localStorage.getItem('token');
            console.log(token);
            if (token !== undefined){

            }
           },
           info_message: '',
           error: false,
           user: {username: '',
           password: ''},
           loginApiEndpoint(){
            const { username, password} = this.user;
                if (!this.user.username && !this.user.password){
                    this.info_message = 'Please fill in the required fields';
                    this.error = true;
                }else{
                    var url = `http://localhost:3001/api/login?username=${username}&password=${password}`
                    fetch(url)
                        .then(r => r.json())
                        .then(result => this.user = result)
                        .then(() => {
                            console.log(this.user);
                            
                            if(this.user.status === 'success'){
                                this.info_message = 'Successfully loggedIn'
                                this.error = false;
                                localStorage.setItem('token', this.user.data.token);
                                localStorage.setItem('love_user', this.user.data.love_user);
                            }else{
                                this.info_message = 'Incorrect username or password'
                                this.error = false;
                            }
                        })
                        .catch(error => console.error(error))
                }
           },
           showLoginRegister(){
                const token = localStorage.getItem('token');

                if (token === undefined || token === null){
                    return true
                }else{
                    return false
                }
           },

           showLoveCounter(){
                const token = localStorage.getItem('token');
                if (token === undefined || token === null){
                    return false
                }else{
                    return true
                }
           }
        
    }
    
}