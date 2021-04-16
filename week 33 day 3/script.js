function addElements(data) {

    data.Countries.map(function (item) {

        let date = new Date(item.Date);
        let fullDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`

        let newChild = document.createElement('div')
        newChild.classList.add('cards')

        let innerHTML = `<p>Total Confirmed: <span>${item.TotalConfirmed}</span></p>
                        <p>Total Deaths: <span>${item.TotalDeaths}</span></p>
                        <p>Total Recovered: <span>${item.TotalRecovered}</span></p>
                        <p>New Confirmed: <span>${item.NewConfirmed}</span></p>
                        <p>New Recovered: <span>${item.NewRecovered}</span></p>`

        newChild.innerHTML = `<h3>${item.Country}</h3>${innerHTML}<hr/><h3>Last Updated: ${fullDate}</h3>`
        document.getElementById('container').appendChild(newChild)

    })
}





function addGlobalElement(data) {
    let globalData = data.Global

    let date = new Date(globalData.Date);
    let fullDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`

    let newChild = document.createElement('div')
    newChild.classList.add('global')

    let innerHTML = `<p>Total Confirmed: <span>${globalData.TotalConfirmed}</span></p>
                        <p>Total Deaths: <span>${globalData.TotalDeaths}</span></p>
                        <p>Total Recovered: <span>${globalData.TotalRecovered}</span></p>
                        <p>New Confirmed: <span>${globalData.NewConfirmed}</span></p>
                        <p>New Recovered: <span>${globalData.NewRecovered}</span></p>`

    newChild.innerHTML = `<h3>Global Stats</h3>${innerHTML}<hr/><h3>Last Updated: ${fullDate}</h3>`
    document.getElementById('container').appendChild(newChild)

}




function getData() {

    fetch("https://api.covid19api.com/summary", { method: 'GET' })
        .then((res) => res.json())
        .then((data) => {
            addGlobalElement(data)
            addElements(data)
        })
}

getData()