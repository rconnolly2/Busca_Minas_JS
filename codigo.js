var dificultad = 1;
var dim_tabla = [8, 8];
var lista_minas = [];
const tabla = CrearTablaMinas(8, 8, 15);
var juego_on = true;
console.log(tabla);

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


function CrearTablaMinas(filas, columnas, minas) {
    // Creo una array de indices (que serán minas) por el numero de minas que me piden
    let tabla = []; // tabla final
    let minas_necesarias = minas;
    while (minas_necesarias!=0) {
        // crea minas
        lista_minas.push([Math.floor(Math.random() * filas), Math.floor(Math.random() * columnas)]);
        minas_necesarias--;
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


function EsPar(n) {
    return n%2 == 0;
}


function crear_tabla(id_div_contenedor) {
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

            div_minas.innerHTML += `<img class="cuadrado" id="cuadrado" index="${i}, ${j}" src="./img/${img_cuadrado}" onclick="click_cuadrado(this)">`;
        }
    }
}

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

function PierdesPartida() {
    let div_minas = document.getElementById("div_minas");

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

function click_cuadrado(elemento_html) {
    let index_cuadrado = elemento_html.getAttribute('index').split(", "); // Consigo el atributo index y divido el string en una lista
    let i = index_cuadrado[0], j = index_cuadrado[1];
    if (tabla[i][j] == 9) {
        console.log("Es mina!");
        PierdesPartida();
    } else {
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
        console.log(i, j)
        if (!EsPar(i-j)) { // si la posición actual del iterador no es par:
            img_cuadrado = img_cuadrado.replace("lightblue", "darkblue"); // cambia la imagen a la version azul oscuro
        } // si i-j no es par cambio a fondo oscuro (?) no se porque falla
        elemento_html.src = "../img/" + img_cuadrado;
        elemento_html.classList.add("flip_individual");

    }
}
