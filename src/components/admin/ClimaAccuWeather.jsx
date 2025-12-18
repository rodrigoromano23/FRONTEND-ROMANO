import { useEffect, useState } from "react";

export default function ClimaSimple() {
  const [clima, setClima] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchClima = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=-34.61&lon=-58.38&units=metric&lang=es&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
        );

        if (!res.ok) throw new Error("Error clima");

        const data = await res.json();
        if (!data || !data.weather || !data.main) {
          throw new Error("Datos incompletos");
        }

        setClima(data);
      } catch (err) {
        console.error("Clima error:", err);
        setError(true);
      }
    };

    fetchClima();
  }, []);

  if (error || !clima) return null;

  return (
    <div
      className="
        hidden md:flex
        h-full
        rounded-2xl
        p-4
        text-center
        shadow-xl
        backdrop-blur-md
        bg-gradient-to-b
        from-sky-300/60
        via-sky-200/50
        to-sky-100/40
        border border-white/30
        flex-col justify-between
      "
    >
      <p className="text-sm opacity-90">Buenos Aires</p>

      <div>
        <div className="flex items-center justify-center gap-2">
          <img
            src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`}
            alt={clima.weather[0].description}
          />
          <span className="text-4xl font-bold text-slate-800">
            {Math.round(clima.main.temp)}°
          </span>
        </div>

        <p className="capitalize text-sm text-slate-700">
          {clima.weather[0].description}
        </p>
      </div>

      <div className="flex justify-around text-xs text-slate-700 opacity-90">
        <span>💧 {clima.main.humidity}%</span>
        <span>💨 {Math.round(clima.wind.speed)} km/h</span>
      </div>
    </div>
  );
}
