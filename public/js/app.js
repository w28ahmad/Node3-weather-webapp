const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
var temp = document.getElementsByClassName('temp');
var acctemp = document.getElementsByClassName('acctemp');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    temp[0].textContent ="loading..."
    acctemp[0].textContent= ''
    fetch('/weather?address='+search.value).then((result)=>{
        result.json().then((data)=>{
            if(data.error){
                temp.innerHTML(data.error)
            }else{
                temp[0].textContent = "Temprature: "+data.temperature+"C";
                acctemp[0].textContent = "Apparent Temprature: "+data.apparentTemprature+"C";
            }
        })
    });
})
