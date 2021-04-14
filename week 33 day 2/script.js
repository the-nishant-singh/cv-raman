const loginForm = document.getElementById('container')
const loginButton = document.getElementById('loginButton')

//eve.holt@reqres.in


loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  let response;
  fetch("https://reqres.in/api/login", {
    method: 'POST', headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      response= res.status
      return res.json();
    })
    .then((data) => {
      if (response !== 200) {
        document.getElementById('errmessage').innerText = data.error
      }
      else {
         location.replace("https://myaccount.google.com/dashboard?hl=en")
      }
    })
    .catch((err) => console.log("err>>>>", err))
})