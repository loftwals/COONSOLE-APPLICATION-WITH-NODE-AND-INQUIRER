import colors from 'colors';
import inquirer from 'inquirer';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.blue}. Crear Tarea`
            },
            {
                value: '2',
                name: `${'2'.blue}. Listar Tareas`
            },
            {
                value: '3',
                name: `${'3'.blue}. Listar Tareas Completadas`
            },
            {
                value: '4',
                name: `${'4'.blue}. Listar Tareas Pendientes`
            },
            {
                value: '5',
                name: `${'5'.blue}. Completar Tareas`
            },
            {
                value: '6',
                name: `${'6'.blue}. Borrar Tareas`
            },
            {
                value: '0',
                name: `${'0'.blue}. Salir`
            },
        ]
    }
];

const inquirerMenu = async () => {
    console.clear();

    console.log('======================'.blue);
    console.log('Seleccione una opcion'.white);
    console.log('======================\n'.blue);
    
    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

    const pausa = async() => {

        const question = [
            {
                type: 'input',
                name: 'enter',
                message: `Presiones ${'enter'.blue} para continuar`
            }
        ];

        console.log('\n');

        await inquirer.prompt(question);
    }

    const leerInput = async(message) => {
        const question = [
            {
                type: 'input',
                name: 'desc',
                message,
                validate(value){
                    if(value.length === 0){
                        return 'Por favor ingrese un valor';
                    }
                    return true;
                }
            }
        ];

        const {desc} = await inquirer.prompt(question);
        return desc;
    }

    const listadoTareaBorrar = async(tareas = []) => {
        const choices = tareas.map((tarea,i) => {
            
            const idx = `${i +1}`.blue;

            return{
                value: tarea.id,
                name: `${idx} ${tarea.descripcion}`
            }
        });

        choices.unshift({
            value: '0',
            name: '0. Cancelar'
        })

        const preguntas = [
            {
                type: 'list',
                name: 'id',
                message: 'borrar',
                choices
            }
        ]

        const { id } = await inquirer.prompt(preguntas);
        return id;
    }

    const confirmar = async(message) => {
        const question = [
            {
                type: 'confirm',
                name: 'ok',
                message
            }
        ];

        const { ok } = await inquirer.prompt(question);
        return ok;
    }


    const mostrarListadoChecckList = async(tareas = []) => {
        const choices = tareas.map((tarea,i) => {
            
            const idx = `${i +1}`.blue;

            return{
                value: tarea.id,
                name: `${idx} ${tarea.descripcion}`,
                checked: (tarea.completadoEn) ? true : false
            }
        });
    

        const pregunta = [
            {
                type: 'checkbox',
                name: 'ids',
                message: 'Selecciones',
                choices
            }
        ]

        const { ids } = await inquirer.prompt(pregunta);
        return ids;
    }


export { inquirerMenu, pausa, leerInput,listadoTareaBorrar, confirmar, mostrarListadoChecckList };
