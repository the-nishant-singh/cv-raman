let yeardata = ""

const search = () => {
    const year = document.getElementById('year__input').value
    if(year){
        let filteredData = yeardata.filter((item) => item.year == year)
        document.getElementById('container').innerHTML=""
        addChild(filteredData)
    }else{
        let filteredData = yeardata.filter((item) => item.year > 2001)
        document.getElementById('container').innerHTML=""
        addChild(filteredData)
    }
    
}

const addChild = (data) => {
    data.map((item) => {
        let newChild = document.createElement('div')
        newChild.classList.add('color__card')
        newChild.style.backgroundColor = item.color
        document.getElementById('container').appendChild(newChild)
    })
    
}


const getData = () => {
    fetch('https://reqres.in/api/unknown', {method: 'GET'})
    .then((res) => res.json())
    .then((result) => {
        yeardata = result.data
        let filteredData = result.data.filter((item) => item.year > 2001)
        addChild(filteredData)})
}

getData()