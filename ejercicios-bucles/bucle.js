// ejercicio: Arrays y objetos
// 1. Arrays (listas)
// crea una lista de tus 3 comidas fovoritas
const comidasFavoritas = ["pizza", "sushi", "tacos"];
// como agrego un elemento a un array en js
comidasFavoritas.push("hamburguesa");
// Muestra la lista en consola
console.log("comidas favoritas:", comidasFavoritas);

// 2. objetos (diccionarios/Fichas)
// lista de alumnos 
let alumno ={
    nombre: "abril",
    edad:18,
    programador:true,
    habilidades: ["js","html","css"],
    estatura:1.60
};
// como accedo a la propiedad nombre del objeto alumno
console.log("nombre del alumno:", alumno.nombre);
// como accedo a la propiedad habildad javaScript del objetivo alunmo
console.log("primera habilidades del alumno:",alumno.habilidades[0]);

//3. Array de objetos
// crear una lista de 3 alnmos (objetos)

const listalumnos = [
    {nombre : "ana luis",calificacion: 88},
    {nombre : "luis", calificacion: 92},
    {nombre : "alex", calificacion: 78}

];

for (let i = 0; i < listalumnos.length; i++) {
    if (listalumnos[i].calificacion >= 80) {
        console.log("Aprobado:", listalumnos[i].nombre, "- Calificación:", listalumnos[i].calificacion);
    }
}
