const axios = require("axios");
const fs = require("fs");
class Busquedas {
  historial = ["Santiago", "Madrid", "Ñuñoa"];
  dbPath = "./db/database.json";

  constructor() {
    //por hacer leer DB si existe
    this.leerDB();
  }
  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }
  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }

  get historialCapitalizado() {
    //capitalizar cada palabra
    return this.historial.map((lugar) => {
      let palabras = lugar.split(" ");//separa las palabras por espacio
      palabras = palabras.map((p) => p[0].toUpperCase() + p.substring(1));//se capitaliza la primera letra de cada palabra
      return palabras.join(" ");//se unen las palabras
    });
  }

  async ciudad(lugar = "") {
    try {
      //peticion http
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });
      const resp = await intance.get(); //espera a que se resuelva la promesa
      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      return []; //retornar los lugares que coincidan con la búsqueda
    }
  }

  async Climadelugar(lat, lon) {
    try {
      //peticion http
      const intance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeather, lat, lon  },
      });
      const resp = await intance.get();//espera a que se resuelva la promesa
      const { weather, main } = resp.data;//desestructuramos el objeto para obtener los datos que necesitamos
      return {
        desc: weather[0].description,//es un arreglo, por eso se pone el 0 para obtener el primer elemento
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  agregarHistorial(lugar = "") {
    //prevenir duplicados
    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return;
    }
    this.historial = this.historial.splice(0, 5);//se guarda solo los 5 primeros elementos
    this.historial.unshift(lugar.toLocaleLowerCase());//se agrega al principio del arreglo
    //grabar en DB
    this.guardarDB();
    


  }
  guardarDB() {
    const payload = {//se crea un objeto con la información que se quiere guardar
      historial: this.historial,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));//se convierte el objeto a un string
  }
  leerDB() {
    //debe existir
    if (!fs.existsSync(this.dbPath)) {//si no existe el archivo
      return;
    }
    const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });//se lee el archivo
    const data = JSON.parse(info);//se convierte el string a un objeto
    this.historial = data.historial;//se asigna el historial del objeto a la propiedad historial de la clase
  }


}

module.exports = Busquedas;
