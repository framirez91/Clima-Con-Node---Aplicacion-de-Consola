require('dotenv').config()

const { leerInput,inquirerMenu,pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
const main = async () => {
  const busquedas = new Busquedas();
  let opt;

  do {//ciclo para que se repita el menú
    opt = await inquirerMenu();//espera a que se resuelva la promesa
    switch(opt){
      case 1:
        //mostrar mensaje
        const termino = await leerInput('Ciudad: ');//espera a que se resuelva la promesa
       
        
        //buscar los lugares
        const lugares = await busquedas.ciudad(termino);//pasamos el término de búsqueda
       
      

        //seleccionar el lugar
        const id = await listarLugares(lugares);//espera a que se resuelva la promesa
        if(id === '0') continue;//si el id es 0, se salta la iteración

        //guardar en DB
        busquedas.agregarHistorial(lugares.find(l => l.id === id).nombre);//busca el lugar seleccionado y lo agrega al historial
        

        const lugarSel = lugares.find(l => l.id === id);//busca el lugar seleccionado

        //mostrar los datos del clima
        const clima = await busquedas.Climadelugar(lugarSel.lat, lugarSel.lng);//espera a que se resuelva la promesa


        //mostrar resultados

        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad: ', lugarSel.nombre.green);
        console.log('Lat: ', lugarSel.lat);
        console.log('Lng: ',lugarSel.lng);
        console.log('Temperatura: C°',clima.temp);
        console.log('Mínima: C°',clima.min);
        console.log('Máxima: C°',clima.max);
        console.log('Como está el clima: ',clima.desc.green);
      break; 
      case 2:
        busquedas.historialCapitalizado.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`);
        }); 
      break;
      case 3:
        busquedas.historial = [];
        console.log('Historial borrado');
    }

    if (opt !== 0) await pausa();//si la opción es diferente de 0, se ejecuta la pausa



  
  } while (opt !== 0);
};

 main();
