import React, { useState, useEffect } from 'react';
import AOS from 'aos';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
         AOS.init({
         duration: 700, 
           easing: 'ease-out-cubic',
           once: true, 
           disable: 'phone', 
         });
       }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!city) return;
    setLoading(true);
    setError('');
    setWeather(null);

    const apiKey = 'e73ae03271cb490f82b92220253006'
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.error) setError(data.error.message);
      else setWeather(data);
    } catch {
      setError('Error fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="position-relative text-white" style={{ minHeight: '100vh' }}>
      <div className="overlay" />
      <div className="container py-5 position-relative" style={{ zIndex: 2 }}>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card bg-dark bg-opacity-75 shadow-lg rounded-4 p-4">
              <h1 className="text-center mb-4 text-white" >🌦️ Weather Checker</h1>

              <form onSubmit={handleSubmit} className="input-group mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Location name..."
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  disabled={loading}
                />
                <button className="btn btn-primary btn-lg" disabled={loading}>
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </form>

              {error && (
                <div className="alert alert-danger text-center">{error}</div>
              )}

              {weather && (
                <div className="card text-white bg-dark rounded-4 shadow-lg p-4" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                    <h3 className="fw-bold">
                        <span className="text-primary">{weather.location.name}</span>, {weather.location.region}
                    </h3>
                    <p className="mb-1 text-uppercase small">{weather.location.country}</p>
                    <h1 className="display-1">{weather.current.temp_c}°</h1>
                    <p className="text-muted">Feels like {weather.current.feelslike_c}°</p>
                    </div>
                    <div>
                    <img
                        src={weather.current.condition.icon}
                        alt="weather icon"
                        className="img-fluid"
                        style={{ width: '100px' }}
                    />
                    <p className="text-center mt-2">{weather.current.condition.text}</p>
                    </div>
                </div>

                <hr className="border-secondary" />

                <div className="row text-center">
                    <div className="col">
                    <i className="bi bi-droplet-half"></i>
                    <p className="mb-0"><strong>Humidity</strong></p>
                    <p>{weather.current.humidity}%</p>
                    </div>
                    <div className="col">
                    <i className="bi bi-wind"></i>
                    <p className="mb-0"><strong>Wind Speed</strong></p>
                    <p>{weather.current.wind_kph} km/h</p>
                    </div>
                </div>
                </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
