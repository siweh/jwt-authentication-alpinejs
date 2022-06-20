import axios from "axios";
export default function RegisterApiEndpoint() {
  return {
    init() {
    //   this.registerApiEndpoint();
    },
    username: "",
    hash_password: "",
    email: "",
    registerApiEndpoint() {
            axios.post("http://localhost:3001/api/register", {
        email: this.email,
        hash_password: this.hash_password,
        username: this.username
        })
        .then((response) => {
        console.log(response);
        });
    }
  }
}
