export default function LoginApiEndpoint(){
    return{
        init() {
            this.loginApiEndpoint();
           },
           user: [],
            username: '',
            hash_password: '',
           loginApiEndpoint(){
            var url = `http://localhost:3001/api/login?username=${this.username}`
            fetch(url)
                        .then(r => r.json())
                        .then(result => this.users = result)
                        .catch(error => console.error(error))
           }
        
    }
    
}