export default function RegisterApiEndpoint() {
  return {
    init() {
      this.registerApiEndpoint();
    },
    user: [],
    username: "",
    hash_password: "",
    email: "",
    love_user: 0,
    registerApiEndpoint() {
      fetch("/api/register"),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            username: this.username,
            hash_password: this.hash_password,
            email: this.email,
            love_user: this.love_user,
          })
            .then(function (res) {
              console.log(res);
            })
            .catch(function (res) {
              console.log(res);
            }),
        };
    },
  };
}
