export default 
    { 
    async GetCityName(cityName: string) 
        {
        const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q= ${cityName}&lang=fr&appid=553978f5bf47bd717b2c2dc256876630`)
        const data = await apiCall.json() ;
        return data ;
        },

    async GetForecast(cityName: string) 
    {
        const apiCall = await fetch(`api.openweathermap.org/data/2.5/forecast?q= ${cityName}&lang=fr&appid=553978f5bf47bd717b2c2dc256876630`)
        const data = await apiCall.json() ;
        return data ;
    }

    }