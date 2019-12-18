/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntasBorradas = new Evento(this);
  this.modificarPreguntas = new Evento(this);
  this.agregarRespuestas = new Evento(this);
  this.agregarVoto = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var id = 0;
    this.preguntas.forEach(element => {
      if( this.ultimoId < element.id) {
        id = element.id;
      }
    });
    return id;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
  },

  //se cargarn las preguntas guardadas
  cargar: function(){
    if(localStorage.getItem("preguntas") !== null)
    {
      this.preguntas = JSON.parse(localStorage.getItem("preguntas"));
    }
  },

  //Eliminar pregunta
  borrarPregunta: function(id) {
    this.preguntas.splice(id-1, 1);
    this.preguntaEliminada.notificar();
    this.guardar();
  },
  
  //agregar respuesta
  agregarRespuesta: function(idPregunta, respuesta) {
    this.preguntas[idPregunta-1].cantidadPorRespuesta.push(respuesta);
    this.agregarRespuestas.notificar();
    this.guardar();
  },
  //agregar voto a respuesta
  agregarVotoRespuesta: function(idPregunta, respuesta) {
    var pregunta = this.preguntas.forEach(pregunta => {
      if(pregunta.textoPregunta === idPregunta){
          pregunta.cantidadPorRespuesta.forEach(resp => {
            if(resp.textoRespuesta === respuesta) {
              resp.cantidad += 1; 
            }
          })
      }});
      this.agregarVoto.notificar();
    this.guardar();
  },
  //Modificar una pregunta
  modificarPregunta: function(idPregunta, pregunta) {
    this.preguntas[idPregunta-1].textoPregunta = pregunta;
    this.modificarPreguntas.notificar();
    this.guardar();
  },
  //Borrar todas las preguntas
  borrarTodasPreguntas: function() {
    this.preguntas = [];
    this.preguntasBorradas.notificar();
    this.guardar();
  },
};
