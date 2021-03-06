const yargs = require('./config/yargs').argv;

const { crear, listar, actualizar, borrar, colors } = require('./por-hacer/por-hacer');

// console.log(yargs);

let comando = yargs._[0];

switch (comando) {

	case 'crear':
		crear(yargs.description)
			.then( porHacerCreado => console.log(porHacerCreado))
			.catch( err => console.log(err));

		break;

	case 'listar':
		listar(yargs.completado)
			.then(listado => {
				for (let tarea of listado) {
					console.log(colors.green('====================Por Hacer==================='));
					console.log(`Tarea  : ${ tarea.description }`);
					console.log(`Estado : ${ tarea.completado }`);
					console.log(colors.green('================================================'));
				}
			})
			.catch(err => console.log(err));

		break;

	case 'actualizar':
		actualizar(yargs.description, yargs.completado)
			.then()
			.catch(err => console.log(err));

		break;

	case 'borrar':
		borrar(yargs.description)
			.then()
			.catch(err => console.log(err));

		break;

	default:
		console.log('comando no reconocido');

}
