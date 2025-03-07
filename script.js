// window.onload = function () {

    const tablero = document.getElementById('tablero');

    //creamos las secciones del tablero
    const secciones = [
        { id: "pendiente", titulo: "Para hacer" },
        { id: "enProceso", titulo: "En proceso" },
        { id: "finalizado", titulo: "Finalizado" }
    ];

    function queListaEs(boton) {

        //comprobamos a qué lista pertenece el botón
        if (boton.parentElement.id === 'pendiente') {
            //guardamos la lista que es para poder añadirle tareas
            lista = listas[0];

        } else if (boton.parentElement.id === 'enProceso') {
            //guardamos la lista que es para poder añadirle tareas
            lista = listas[1];

        } else if (boton.parentElement.id === 'finalizado') {
            //guardamos la lista que es para poder añadirle tareas
            lista = listas[2];

        }
    }

    addEventListener('DOMContentLoaded', () => {

        //por cada sección se crea un section con su id, su título y sus contenidos (lista de tareas y botones de añadir o eliminar lista)
        secciones.forEach(function (seccion) {
            const section = document.createElement('section');
            section.id = seccion.id;
            section.className = 'tarjeta';

            section.innerHTML = "<h2  class=\"lista-titulo\">" + seccion.titulo + "</h2>\n" +
                "        <div class=\"listas\">\n" +
                "            <br>\n" +
                "        </div>\n" +
                "        <button class=\"crear-tarjeta\">Añadir tarjeta</button>\n" +
                "        <button class=\"eliminar-lista\">Eliminar lista</button>";

            tablero.appendChild(section);
        });

        //recogemos después de cargar el DOM los botones creados anteriormente dentro de los section
        const anadirTarjeta = document.querySelectorAll('.crear-tarjeta');
        const eliminarLista = document.querySelectorAll('.eliminar-lista');
        const listas = document.querySelectorAll('.listas');
        let lista;

        //recorremos los botones de añadir tarjeta y les añadimos un evento
        anadirTarjeta.forEach(function (boton) {
            boton.addEventListener('click', function () {

                //miramos a qué lista pertenece el botón para que se añada en el section que toca
                queListaEs(boton)

                //dentro del div "listas" del section que toca añadimos una nueva tarea
                lista.innerHTML += "<div class=\"lista\" style='visibility: visible; margin-top:0.5em;' draggable='true'>\n" +
                    "            <p class=\"tarea\" style='margin:0;'>Nueva tarjeta</p>\n" +
                    "            <br><button class=\"x\">x</button>\n" +
                    "        </div>";
            });
        });

        //recorremos los botones de eliminar lista y les añadimos un evento
        eliminarLista.forEach(function (boton) {
            boton.addEventListener('click', function () {

                console.log(boton.parentElement.id)
                //miramos a qué lista pertenece el botón para borrar la lista correspondiente
                queListaEs(boton)

                //borramos la lista entera
                lista.innerHTML = '<br>';
            });
        });

        function queListaEs(boton) {

            //comprobamos a qué lista pertenece el botón
            if (boton.parentElement.id === 'pendiente') {
                //guardamos la lista que es para poder añadirle tareas
                lista = listas[0];

            } else if (boton.parentElement.id === 'enProceso') {
                //guardamos la lista que es para poder añadirle tareas
                lista = listas[1];

            } else if (boton.parentElement.id === 'finalizado') {
                //guardamos la lista que es para poder añadirle tareas
                lista = listas[2];

            }
        }

        let listaMovida;
        //evento para arrastrar una tarea
        document.addEventListener('dragstart', function (event) {
            //si se hacee dragstart sobre una tarea se guarda dicha tarea, para más tarde poder eliminarla de la lista anterior
            if (event.target.classList.contains('lista')) {
                listaMovida = event.target;
                //se guarda la tarea en el dataTransfer
                event.dataTransfer.setData('text/html', event.target.outerHTML);
            }
        });

        //evento necesario para poder usar el drop
        document.addEventListener('dragover', function (event) {
            if (event.target.classList.contains('listas')) {
                event.preventDefault();
            }
        });

        //evento para soltar la tarea
        document.addEventListener('drop', function (event) {
            //cobruebo que se haya soltado sobre una lista
            if (event.target.classList.contains('listas')) {
                event.preventDefault();
                //borro la tarea de la lista anterior
                listaMovida.remove();
                //pinto el dataTransfer de la tarea en la nueva lista
                event.target.innerHTML += event.dataTransfer.getData('text/html');
            }
        });


        /*
        al crear las tareas y los botones x desde el evento anterior, para poder añadir eventos sobre ellos
        he recurrido a añadir un evento sobre todo el doc y comprobar si el target es un p o un button
        */
        document.addEventListener('dblclick', function (event) {
            //con este se podrá modificar el nombre de la tarea
            if (event.target.classList.contains('tarea')) {
                const tarea = event.target;
                const input = document.createElement('input');
                input.type = 'text';
                input.value = tarea.innerHTML;

                input.addEventListener('blur', function () {
                    tarea.innerHTML = input.value;
                    input.replaceWith(tarea);
                });

                tarea.replaceWith(input);
                input.focus();
            }
        })

        document.addEventListener('click', function (event) {
            //con este se podrá borrar la tarea
            if (event.target.classList.contains('x')) {
                event.target.parentElement.remove();
            }
        });
    });
// }


