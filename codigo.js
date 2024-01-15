var lista_minas = [];
var n_minas = 10;
var n_col = 8;
var puntuacion = 0;
var tabla = CrearTablaMinas(n_col, n_col, n_minas);
CrearTablaVacia("div_minas");

/**
 * Añade valores alrededor de una mina en la tabla.
 * Utilizado durante la creación de la tabla de minas.
 * @param {Array.<number>} index_mina - Coordenadas [fila, columna] de la mina.
 * @param {Array.<Array.<number>>} tabla - Tabla de minas.
 */
function MinaAlrededor(index_mina, tabla) {
    let posx_alrededor_min, posy_alrededor_min;
    // Iteración alrededor de la mina:
    for (let i=-1; i<=1; i++) {
        for (let j=-1; j<=1; j++) {
            posy_alrededor_min = i+index_mina[0];
            posx_alrededor_min = j+index_mina[1];

            if (!(posy_alrededor_min > tabla.length-1 || posy_alrededor_min < 0 || posx_alrededor_min > tabla[0].length-1 || posx_alrededor_min < 0)) { // Si la posición del iterador alrededor de la mina no se sale de la longitud de la lista
                // añadimos +1 alrededor de las minas que no den: index out of bound error
                if (tabla[posy_alrededor_min][posx_alrededor_min] < 9) {
                    tabla[posy_alrededor_min][posx_alrededor_min]++;
                }
            }
        }
    }
}

/**
 * Crea una tabla de minas con las dimensiones y minas especificadas.
 * @param {number} filas - Número de filas de la tabla.
 * @param {number} columnas - Número de columnas de la tabla.
 * @param {number} minas_necesarias - Número de minas que se deben colocar en la tabla.
 * @returns {Array.<Array.<number>>} La tabla creada.
 */
function CrearTablaMinas(filas, columnas, minas_necesarias) {
    // Creo una array de indices (que serán minas) por el numero de minas que me piden
    let tabla = []; // tabla final
    lista_minas = []; // vació lista minas
    while (minas_necesarias!=0) {
        minas_necesarias--;
        // crea minas aleatorias
        lista_minas.push([Math.floor(Math.random() * filas), Math.floor(Math.random() * columnas)]);
    }

    // Ahora creo la tabla de ceros y minas
    for (let i=0; i<=filas-1; i++) {
        tabla.push([]);
        for (let j=0; j<=columnas-1; j++) {
            let exista_mina = lista_minas.some(function(mina) { // some() ejecuta una función sobre todos sus elementos
                return mina[0] == i && mina[1] == j; // si encuentro un indice de una mina donde estoy ahora devuelvo true
            });

            if (exista_mina) { // si existe mina lo represento con un 4
                tabla[i].push(9);
            } else {  // si no lo represento con un 0
                tabla[i].push(0);
            }
        }
    }

    // Y por ultimo recorro la tabla y si me encuentro con una mina
    // incremento los numero alrededor de la mina por 1
    for (let i=0; i<=tabla.length-1; i++) {
        for (let j=0; j<=tabla.length-1; j++) {

            // Itero alrededor de la mina:
            if (tabla[i][j] >= 9) { // es una mina!
                MinaAlrededor([i, j], tabla); // Se encarga de añadir +1 alrededor de la mina
            }

        }
    }

    return tabla; // devuelvo tabla acabada
  }

/**
 * Verifica si un número es par.
 * @param {number} n - Número a verificar.
 * @returns {boolean} True si el número es par, false en caso contrario.
 */
function EsPar(n) {
    return n%2 == 0;
}

/**
 * Inicializa el juego con valores proporcionados por el usuario o valores predeterminados.
 */
function IniciarJuego() {
    let input_nminas = Number(document.getElementById("num_minas").value);
    let input_ncols = Number(document.getElementById("dimensiones-tabla").value);
    let div_minas = document.getElementById("div_minas");
    let info_usuario = document.getElementById("info_user");
    puntuacion = 0;
    
    // Cambio el label de perdido a => puntuación: 0
    if (info_usuario.innerHTML=="¡Has perdido!") {
        info_usuario.innerHTML=`Puntuación: ${puntuacion}`;
        info_usuario.style.color = "green"; // cambio texto a color verde
    }

    // Me aseguro que pone como mínimo 1 mina y como mínimo 3 columnas sino pongo mis valores por defecto
    if (input_nminas>1 && input_ncols>=3) {
        n_minas = input_nminas, n_col = input_ncols;
        div_minas.style.width = (n_col*100) + "px"; // cambio ancho div contenedor minas al nuevo ancho
    } else {
        n_minas = 10;
        n_col = 8; // VALORES POR DEFECTO
        div_minas.style.width = (n_col*100) + "px"; // cambio ancho div contenedor
    }

    div_minas.innerHTML = ""; // elimino todas las img dentro del div padre
    // Creo la tabla
    tabla = CrearTablaMinas(n_col, n_col, n_minas);
    // Pinto la tabla vacía
    CrearTablaVacia("div_minas");

}

/**
 * Crea una tabla vacía en el contenedor especificado.
 * @param {string} id_div_contenedor - ID del contenedor donde se creará la tabla.
 */
function CrearTablaVacia(id_div_contenedor) {
    let div_minas = document.getElementById(id_div_contenedor);
    for (let i=0; i<=tabla.length-1; i++) {
        for (let j=0; j<=tabla[i].length-1; j++) {
            let img_cuadrado;

            if (EsPar(i+j)) { // Sumo iteradores columnas, filas y compruebo si es par:
                              // https://stackoverflow.com/a/75585834
                img_cuadrado = "lightblue.png";
            } else {
                img_cuadrado = "darkblue.png";
            }

            div_minas.innerHTML += `<img class="cuadrado" id="cuadrado" index="${i}, ${j}" src="./img/${img_cuadrado}" onclick="ClickCuadrado(this)">`;
        }
    }
}

/**
 * Verifica si dos listas son iguales, independientemente del orden de los elementos.
 * @param {Array} lista1 - Primera lista a comparar.
 * @param {Array} lista2 - Segunda lista a comparar.
 * @returns {boolean} True si las listas son iguales, false en caso contrario.
 */
function SonListasIguales(lista1, lista2) {
    let lista1_ord, lista2_ord;
    if (lista1.length !== lista2.length) {
        return false;
    }

    lista1_ord = lista1.sort(), lista2_ord = lista2.sort();

    for (let i=0; i<=lista1_ord.length-1; i++) {
        if (lista1_ord[i] != lista2_ord[i]) {
            return false;
        }
    }

    return true;
}

/**
 * Muestra la pantalla de pérdida de partida y revela todas las minas.
 */
function PierdesPartida() {
    let div_minas = document.getElementById("div_minas");
    let lista_elem_minas = document.querySelectorAll("img");
    let info_usuario = document.getElementById("info_user");

    // Cambio el label de información usuario a has perdido !
    info_usuario.innerHTML="¡Has perdido!";
    info_usuario.style.color = "red"; // cambio texto a color rojo

    for (mina of lista_elem_minas) {
        mina.removeAttribute('onclick'); // elimino el atributo onclick de todos las img
    }

    for (let i=0; i<=tabla.length-1; i++) {
        for (let j=0; j<=tabla.length-1; j++) {

            let img_cuadrado;
            switch (tabla[i][j]) {
                case 0:
                    img_cuadrado = "lightblue.png";
                    break;
                case 1:
                    img_cuadrado = "1_lightblue.png";
                    break;
                case 2:
                    img_cuadrado = "2_lightblue.png";
                    break;
                case 3:
                    img_cuadrado = "3_lightblue.png";
                    break;
                case 9:
                    img_cuadrado = "mina_lightblue.png";
                    break;
                default:
                    img_cuadrado = "3_lightblue.png";

                }

            setTimeout(() => { // Sustituyo cada cuadrado por la imagen que tenga en tabla
                if (!EsPar(i+j)) { // si la posición actual del iterador no es par:
                    img_cuadrado = img_cuadrado.replace("lightblue", "darkblue"); // cambia la imagen a la version azul oscuro
                }

                const elemento_img = div_minas.querySelector(`img[index="${i}, ${j}"]`);

                if (elemento_img) {
                    elemento_img.src = `./img/${img_cuadrado}`;
                    elemento_img.classList.add("flip_individual");
                }
            }, i * 800); // por cada iteración 0,8s de delay
        }
    }
}

/**
 * Maneja el clic en un cuadrado de la tabla.
 * @param {HTMLImageElement} elemento_html - Elemento de imagen que representa el cuadrado clicado.
 */
function ClickCuadrado(elemento_html) {
    let index_cuadrado = elemento_html.getAttribute('index').split(", "); // Consigo el atributo index y divido el string en una lista
    let info_usuario = document.getElementById("info_user");
    let i = index_cuadrado[0], j = index_cuadrado[1];
    let img_cuadrado;
    if (tabla[i][j] == 9) { // Si el valor clickado es = 9 es una mina !
        PierdesPartida(); 
    } else {
        // Añado puntuación+1 y actualizo puntuación por pantalla
        puntuacion++;
        if (puntuacion==(n_col*n_col)-n_minas) { // Si la puntuación es igual a el numero de cuadrados - numero de minas
            info_usuario.innerHTML= "¡Has ganado!" // Ganas!
        } else {
            info_usuario.innerHTML=`Puntuación: ${puntuacion}`;
        }

        switch (tabla[i][j]) {
            case 0:
                img_cuadrado = "lightblue.png";
                break;
            case 1:
                img_cuadrado = "1_lightblue.png";
                break;
            case 2:
                img_cuadrado = "2_lightblue.png";
                break;
            case 3:
                img_cuadrado = "3_lightblue.png";
                break;
            case 9:
                img_cuadrado = "mina_lightblue.png";
                break;
            default:
                img_cuadrado = "3_lightblue.png";
        }

        if (!EsPar(i-j)) { // si la posición actual del iterador no es par:
            img_cuadrado = img_cuadrado.replace("lightblue", "darkblue"); // cambia la imagen a la version azul oscuro
        } // si i-j no es par cambio a fondo oscuro (?) no se porque falla
        elemento_html.src = "../img/" + img_cuadrado;
        elemento_html.classList.add("flip_individual");

    }
}
