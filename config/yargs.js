const colors = require('colors');

const description = {
	alias: 'd',
	demand: true,
	desc: 'Description del "todo"',

}

const argv = require('yargs')
	.command('crear',`Crea un elemento por hacer.`.cyan,
	{
		description,
	})
	.command('listar',`Lista todos los "todos".`.cyan)
	.command('actualizar',`Actualizar el estados de los "todos".`.cyan,
	{
		description,
		completado:{
			alias: 'c',
			default: true,
			desc: 'Marca de completado "true" or "false"'
		}
	})
	.command('borrar',`Borra el elemento que hace match con la description`.cyan,
	{
		description
	})

	.help()
	.argv;


module.exports = {
	argv
}
