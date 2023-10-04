const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      //arreglo de objetos
      {
        value: 1,
        name: `${"1.".green} Buscar ciudad`,
      },
      {
        value: 2,
        name: `${"2.".green} Historial de busquedas`,
      },
      {
        value : 3,
        name : `${"3.".green} Limpiar historial`,

      },
      {
        value: 0,
        name: `${"0.".green} Salir`,
      }
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("===========================".rainbow);
  console.log("   Seleccione una opción".white.bold);
  console.log("===========================\n".rainbow);

  const { opcion } = await inquirer.prompt(preguntas); //desestructuración de objetos

  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question); //espera a que se resuelva la promesa
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message, //message: mensaje para no ser redundante
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question); //desestructuración de objetos
  return desc;
};

const listarLugares = async (lugares = []) => {
  const choices = lugares.map((lugar, i) => {//el map regresa un nuevo arreglo
    //se recorre el arreglo de lugares
    const idx = `${i + 1}.`.green; //se crea una constante para guardar el indice
    return {
      value: lugar.id,
      name: `${idx} ${lugar.nombre}`,
    };
  });
  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar",
  });
  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Seleccione lugar: ",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas); //desestructuración de objetos
  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message, //message: mensaje para no ser redundante
    },
  ];
  const { ok } = await inquirer.prompt(question); //desestructuración de objetos
  return ok;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {//el map regresa un nuevo arreglo
    //se recorre el arreglo de tareas
    const idx = `${i + 1}.`.green; //se crea una constante para guardar el indice
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: (tarea.completadoEn) ? true : false//se usa ternario para saber si la tarea esta completada o no
    };
  });
  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta); //desestructuración de objetos
  return ids;
};



module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
  confirmar,
  mostrarListadoChecklist
  
};
