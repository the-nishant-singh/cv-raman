const container =  document.getElementById('container')


const addToDOM = (result) => {
    result.data.map((item) => {
        const newChild = document.createElement('div')
        newChild.classList.add('profile')
        newChild.innerHTML = `<center><h3>${item.first_name} ${item.last_name}</h3><p>${item.email}</p><img src=${item.avatar} class="images"/><cemter/>`
        container.appendChild(newChild)
    })
}


const fetchData = () => {
    fetch('https://reqres.in/api/users', { method: "GET" })
    .then((res) => res.json())
    .then((result) => addToDOM(result))
}

fetchData()
