var dificultad = 1;
var dim_tabla = [8, 8];
const tabla = CrearTablaMinas(8, 8, 15);
console.log(tabla);

function MinaAlrededor(index_mina, tabla, lista_minas) {
    let posx_alrededor_min, posy_alrededor_min;
    // Iteración alrededor de la mina:
    for (let i=-1; i<=1; i++) {
        for (let j=-1; j<=1; j++) {
            posy_alrededor_min = i+index_mina[0];
            posx_alrededor_min = j+index_mina[1];

            if (!(posy_alrededor_min > tabla.length-1 || posy_alrededor_min < 0 || posx_alrededor_min > tabla[0].length-1 || posx_alrededor_min < 0)) { // Si la posición del iterador alrededor de la mina no se sale de la longitud de la lista
                // añadimos +1 alrededor de las minas que no den: index out of bound error
                if (tabla[posy_alrededor_min][posx_alrededor_min] < 3) {
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
    let lista_minas = [];
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
                tabla[i].push(4);
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
            if (tabla[i][j] >= 4) { // es una mina!
                MinaAlrededor([i, j], tabla, lista_minas); // Se encarga de añadir +1 alrededor de la mina
            }

        }
    }

    return tabla; // devuelvo tabla acabada
  }


function crear_tabla(id_div_contenedor) {
    let div_minas = document.getElementById(id_div_contenedor);
    for (let i=0; i<=tabla.length-1; i++) {
        for (let j=0; j<=tabla[i].length-1; j++) {
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
                default:
                    img_cuadrado = "mina_lightblue.png";
            }

            if (tabla[i][j] == tabla[i].length-1) { // Si es el ultimo numero de la columna, pintar y añadir un br
                div_minas.innerHTML += `<img class="cuadrado" id="cuadrado" index="${i}, ${j}" src="./img/${img_cuadrado}">`;
                div_minas.innerHTML += "<br>";
            } else { // Si no pintar el cuadrado que toca
                div_minas.innerHTML += `<img class="cuadrado" id="cuadrado" index="${i}, ${j}" src="./img/${img_cuadrado}">`;
            }
        }
    }
}