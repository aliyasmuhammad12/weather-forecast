import { createContext, useContext, useState } from "react";
import { getWeatherDataForCity, getWeatherDataForLocation } from "../api";

const WeatherContext = createContext(null);

export const useWeather = () => {
  return useContext(WeatherContext);
};

export const WeatherProvider = (props) => {
  const [data, setData] = useState(null);
  const [searchCity, setSearchCity] = useState(null);

  // to fetch data from api
  const fetchData = async () => {
    const response = await getWeatherDataForCity(searchCity);
    setData(response);
    // know whatever data comes we set into setdata
  };

  const fetchCurrentUserLocationData = async()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
        getWeatherDataForLocation(
            position.coords.latitude, 
            position.coords.longitude
            ).then(data=>setData(data));
    })
  }
  return (
    <WeatherContext.Provider
      value={{ searchCity, data, setSearchCity, fetchData, fetchCurrentUserLocationData }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};
