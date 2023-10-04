
# Aplicación de Clima y Búsquedas

Esta es una aplicación de línea de comandos (CLI) para buscar información sobre el clima de diferentes ciudades y gestionar un historial de búsquedas. Utiliza las API de Mapbox y OpenWeather para obtener datos de ubicaciones y condiciones climáticas respectivamente.

## Requisitos previos

Antes de comenzar, asegúrate de tener las siguientes API keys:

- [MAPBOX_KEY](https://www.mapbox.com/)
- [OPENWEATHER_KEY](https://openweathermap.org/)

## Instalación

1. Clona este repositorio en tu máquina local:

   ```
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Instala las dependencias del proyecto usando npm:

   ```
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto y agrega tus API keys:

   ```
   MAPBOX_KEY=tu_api_key_de_mapbox
   OPENWEATHER_KEY=tu_api_key_de_openweather
   ```

## Uso

Para ejecutar la aplicación, utiliza el siguiente comando:

```
node index.js
```

La aplicación te mostrará un menú con las siguientes opciones:

1. **Buscar ciudad:** Permite buscar información sobre una ciudad específica, incluyendo datos del clima actual.
2. **Historial de búsquedas:** Muestra un historial de las ciudades buscadas previamente.
3. **Limpiar historial:** Borra el historial de búsquedas.
0. **Salir:** Cierra la aplicación.

## Créditos

Este proyecto fue desarrollado por [Felipe Ramirez Diaz](framirez.d85@gmail.com).


---

Recuerda reemplazar `<URL_DEL_REPOSITORIO>`, `tu_api_key_de_mapbox` y `tu_api_key_de_openweather` con la URL de tu repositorio, tu API key de Mapbox y tu API key de OpenWeather respectivamente.

## el proyecto es original de Fernando Herrera en su curso de Node.js
