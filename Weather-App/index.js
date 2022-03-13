const userInput = document.querySelector( '.search-box' );
userInput.addEventListener( 'keypress', function(event) {
    if (event.code === 'Enter') {
        // code for enter
        console.log( userInput.value );
        fetchWeatherData( userInput.value );
    }
});

const fetchWeatherData = ( city ) => {
    const apikey = "7e3f21edee540e6110af347b55eb1ab2";
    const url = `https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=${apikey}`;
    console.log( url );

    fetch( url )
    .then(response => response.json())
    .then(data => {
        console.log( data );
        showWeather( data );
    })
    .catch(error => console.log( error.message));

    console.log( 'end of script' );
}

const showWeather = ( data ) => {
    console.log( data.list[0].main.temp );
    document.querySelector('.city').textContent = data.list[0].name;
    document.querySelector('.temp').textContent = data.list[0].main.temp + ' °C';
    document.querySelector('.weather').textContent = data.list[0].weather[0].main;
    document.querySelector('.hi-low').textContent = `${data.list[0].main.temp_min} °C / ${data.list[0].main.temp_max} °C`;
    document.querySelector('.date').textContent = getFormattedDate(data.list[0].dt);
}

const getFormattedDate = (dt) => {
    const date = new Date(dt * 1000);
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    const formattedDate = `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
    return formattedDate;

}