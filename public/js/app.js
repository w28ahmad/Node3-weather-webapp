const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

var temp = document.getElementById('temp');
var acctemp = document.getElementById('acctemp');
var timezone = document.getElementById('timezone');
var DailyComment = document.getElementById('Comment');
var TempHigh = document.getElementById('TempHigh');
var TempLow = document.getElementById('TempLow');
var cloudCover = document.getElementById('cloudCover');
var UV = document.getElementById('UV');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    temp.textContent ="loading..."
    acctemp.textContent= ''
    timezone.textContent= ''
    DailyComment.textContent= ''
    TempHigh.textContent= ''
    TempLow.textContent= ''
    cloudCover.textContent= ''
    UV.textContent= ''
    
    fetch('/weather?address='+search.value).then((result)=>{
        result.json().then((data)=>{
            if(data.error){
                temp.innerHTML(data.error)
            }else{
                temp.textContent = "Current Temprature: "+data.temperature+"C";
                acctemp.textContent = "Current Apparent Temprature: "+data.apparentTemprature+"C";
                timezone.textContent= "Time Zone:"+data.timezone;
                DailyComment.textContent= 'Comment: '+data.DailyComment;
                TempHigh.textContent= 'Morning High: '+data.TempHigh+"C";
                TempLow.textContent= 'Morning Low: '+data.TempLow+"C";
                cloudCover.textContent= 'Cloud Cover: '+data.cloudCover;
                UV.textContent= 'UV: ' +data.UV;
            }
        })
    });
})
