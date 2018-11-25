const fs = require('fs');
const colors = require('colors/safe');

let listadoPorHacer = [];


// Operacion exitosa.
	const succes = (proceso) => {
		return console.log(colors.green(`\n ${ proceso }  exitosamente\n`));
	}

	//Carga el archivo json para, que el arry este actualizado y almacene  info y no que la sustituya
	const cargarDB = () => {
		try {

			listadoPorHacer = require('../db/data.json');
			succes('DB cargada');

		} catch (err) {
			listadoPorHacer = [];
		}
	}

// Genera el archibo y lo actualiza.
	const guardarDB = async () => {
		let data = JSON.stringify(listadoPorHacer);

		fs.writeFile(`db/data.json`, data , (err) => {
			if (err) throw new Error(colors.red(`Nos se logro guardar`,err))
		});
	}

// Crea las tareas y las guardar en la DB(archivo .json que esta en la carpeta db).
	const crear = async(description) => {

		cargarDB();

		let porHacer = {
			description,
			completado: false
		};

		for (let porHacerlistado of listadoPorHacer) {
			if (porHacer.description.toUpperCase() === porHacerlistado.description.toUpperCase()) {
				throw new Error (colors.red(`La tarea ${ porHacer.description } ya ha sido creada`));
			}
		}


		if (description === true || description.length === 0) {
			throw new Error (colors.red('La descripcion esta Vacia'));
		}else {

			listadoPorHacer.push(porHacer);

			await guardarDB();

		 	succes('Tarea creada');
			return (`Tarea: ${ colors.bgWhite.black(porHacer.description) } Estado: ${ colors.bgWhite.black(porHacer.completado) }`);
		}
	}

// Lista todas las tareas en la DB.
	const listar = async () => {

		cargarDB();

		if (listadoPorHacer.length == 0) {
			throw new Error(colors.red(`Listado vacio!!`));

		} else {

			for (let tarea of listadoPorHacer) {
				console.log(colors.green('====================Por Hacer==================='));
				console.log(`Tarea  : ${ tarea.description }`);
				console.log(`Estado : ${ tarea.completado }`);
				console.log(colors.green('================================================'));
			}
		}
	}

const actualizar = async (description, completado = true) => {

	cargarDB();

	let index = listadoPorHacer.findIndex( tarea => {
		return tarea.description.toUpperCase() === description.toUpperCase();
	});

	if (index < 0) {
		throw new Error(`Error Tarea: ${ description } no encontrada`);

	}else{
		listadoPorHacer[index].completado = completado;
		guardarDB();

		return succes('Estado modificado');
	}
}

const borrar = async (description) => {
	cargarDB();

	let index = listadoPorHacer.findIndex( tarea => {
		return tarea.description.toUpperCase() === description.toUpperCase();
	});

	if (index < 0) {
		throw new Error(`Error Tarea: ${ description } no encontrada`)
	} else {
		listadoPorHacer.splice(index, 1);
		guardarDB();

		return succes(`Tarea: ${ description } Eliminada!!` );
	}

}

module.exports = {
	crear,
	listar,
	actualizar,
	borrar
};
