import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, MapPin, Thermometer, Droplets, Wind, Eye } from 'lucide-react';
import WeatherLogo from '@/components/ui/WeatherLogo';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  icon: string;
}

const WeatherApp: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>({
    location: 'İstanbul',
    temperature: 22,
    condition: 'Güneşli',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    icon: '☀️'
  });
  const [searchCity, setSearchCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simulated weather data for different cities
  const weatherData: Record<string, WeatherData> = {
    'istanbul': {
      location: 'İstanbul',
      temperature: 22,
      condition: 'Güneşli',
      humidity: 65,
      windSpeed: 12,
      visibility: 10,
      icon: '☀️'
    },
    'ankara': {
      location: 'Ankara',
      temperature: 18,
      condition: 'Parçalı Bulutlu',
      humidity: 70,
      windSpeed: 8,
      visibility: 8,
      icon: '⛅'
    },
    'izmir': {
      location: 'İzmir',
      temperature: 25,
      condition: 'Açık',
      humidity: 60,
      windSpeed: 15,
      visibility: 12,
      icon: '☀️'
    },
    'antalya': {
      location: 'Antalya',
      temperature: 28,
      condition: 'Güneşli',
      humidity: 55,
      windSpeed: 10,
      visibility: 15,
      icon: '☀️'
    },
    'trabzon': {
      location: 'Trabzon',
      temperature: 16,
      condition: 'Yağmurlu',
      humidity: 85,
      windSpeed: 20,
      visibility: 5,
      icon: '🌧️'
    }
  };

  const handleSearch = () => {
    if (!searchCity.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const cityKey = searchCity.toLowerCase().trim();
      const cityData = weatherData[cityKey];
      
      if (cityData) {
        setWeather(cityData);
      } else {
        // Default weather for unknown cities
        setWeather({
          location: searchCity,
          temperature: Math.floor(Math.random() * 15) + 15,
          condition: 'Parçalı Bulutlu',
          humidity: Math.floor(Math.random() * 30) + 50,
          windSpeed: Math.floor(Math.random() * 15) + 5,
          visibility: Math.floor(Math.random() * 8) + 5,
          icon: '⛅'
        });
      }
      
      setIsLoading(false);
      setSearchCity('');
    }, 1000);
  };

  const refreshWeather = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Simulate weather update
      setWeather(prev => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 10)),
        windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5) * 5)
      }));
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="h-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <WeatherLogo className="w-12 h-12" />
            <h1 className="text-3xl font-bold text-white">Hava Durumu</h1>
          </div>
          <Button
            onClick={refreshWeather}
            disabled={isLoading}
            variant="secondary"
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Yenile
          </Button>
        </div>

        {/* Search */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Şehir ara..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
              <Button
                onClick={handleSearch}
                disabled={isLoading || !searchCity.trim()}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Ara
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Weather Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-white/80" />
                <h2 className="text-2xl font-semibold text-white">{weather.location}</h2>
              </div>
              <div className="text-6xl">{weather.icon}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Temperature */}
              <div className="text-center">
                <div className="text-6xl font-bold text-white mb-2">
                  {Math.round(weather.temperature)}°
                </div>
                <div className="text-xl text-white/80">{weather.condition}</div>
              </div>

              {/* Weather Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-white/80" />
                    <span className="text-white/80">Nem</span>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    %{weather.humidity}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="w-5 h-5 text-white/80" />
                    <span className="text-white/80">Rüzgar</span>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {weather.windSpeed} km/h
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-white/80" />
                    <span className="text-white/80">Görüş</span>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {weather.visibility} km
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Cities */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Hızlı Şehirler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Object.keys(weatherData).map((city) => (
                <Button
                  key={city}
                  onClick={() => {
                    setWeather(weatherData[city]);
                  }}
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  {weatherData[city].location}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherApp;
