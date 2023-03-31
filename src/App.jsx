import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { ListIcon } from './data/variables.js';
import './index.css';

function App() {
   const [city, setCity] = useState('');
   const [weather, setWeather] = useState(null);
   const [loading, setLoading] = useState(false);
   const [notFound, setNotFound] = useState(false);

   const API_KEY = '70e5250cd53256a89b7fec97b00ad8f4'; //api tự tạo

   const handleSubmit = event => {
      event.preventDefault();
      handleSearch();
   };

   const handleSearch = () => {
      if (city.trim() !== '') {
         setLoading(true);
      }
   };

   const handleInputChange = event => {
      setCity(event.target.value);
   };

   const handleKeyPress = event => {
      if (event.key === 'Enter' && city.trim() !== '') {
         handleSearch();
      }
   };

   useEffect(() => {
      const fetchWeather = async () => {
         try {
            const { data } = await axios.get(
               `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeather(data);
            setLoading(false);
            setNotFound(false);
         } catch (error) {
            console.error(error);
            setLoading(false);
            setNotFound(true);
         }
      };

      if (loading) {
         fetchWeather();
      }
   }, [loading, city]);

   return (
      <div className='flex flex-col h-screen w-full justify-center items-center bg-gray-700'>
         <div className='p-4'>
            <h1 className='text-3xl text-white font-[inter] font-semibold p-4'>
               Weather App
            </h1>
         </div>
         <form
            className='flex items-center bg-white p-4 rounded-lg shadow-lg mb-2'
            onSubmit={handleSubmit}
         >
            <input
               type='text'
               id='city'
               name='city'
               className='w-[300px] p-2 font-semibold font-[inter] outline-none text-black placeholder-gray-500 placeholder:font-semibold'
               placeholder='ENTER YOUR LOCATION'
               value={city}
               onChange={handleInputChange}
               onKeyDown={handleKeyPress}
            />
            <button
               type='submit'
               className='bg-transparent p-2'
               disabled={!city}
               onClick={handleSearch}
            >
               <FaSearch fontSize='20px' />
            </button>
         </form>
         {loading && <p className='text-white font-[inter]'>Loading...</p>}
         {!loading && !notFound && weather && (
            <div className='flex flex-col items-center bg-white rounded-lg w-[366px] p-2'>
               <h2 className='font-semibold font-[inter] py-2 capitalize text-[24px]'>
                  {weather.name}
               </h2>
               <img
                  src={
                     ListIcon.filter(
                        icon =>
                           icon.type.toLowerCase() ===
                           weather.weather[0].main.toLowerCase()
                     )[0].img
                  }
                  alt='weather icon'
                  className='w-4/5'
               />
               <h2 className='font-semibold font-[inter] py-0.5 capitalize text-[20px]'>
                  {weather.weather[0].description}
               </h2>
               <div className='py-2'>
                  <p className='font-semibold font-[inter]'>
                     Temperature: {weather.main.temp} &#8451;
                  </p>
                  <p className='font-semibold font-[inter]'>
                     Feels like: {weather.main.feels_like} &#8451;
                  </p>
                  <p className='font-semibold font-[inter]'>
                     Humidity: {weather.main.humidity}%
                  </p>
                  <p className='font-semibold font-[inter]'>
                     Windspeed: {weather.wind.speed} m/s
                  </p>
               </div>
            </div>
         )}
         {notFound && (
            <div className='flex justify-center bg-white rounded-lg w-[366px] p-2'>
               <p className='font-semibold font-[inter]'>
                  Not found. Please search again.
               </p>
            </div>
         )}
      </div>
   );
}

export default App;
