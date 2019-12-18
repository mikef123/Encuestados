/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function(id) {
    if(id !== undefined){
      this.modelo.borrarPregunta(id);
    }
  },
  agregarRespuesta: function(idPregunta, respuesta) {
    if(idPregunta !== undefined && idPregunta >= 0 && respuesta !== undefined){
    this.modelo.agregarRespuesta(idPregunta, respuesta);
    }
  },
  agregarVoto: function(nombrePregunta, respuestaSeleccionada) {
    if(nombrePregunta != "" && respuestaSeleccionada !== ""){
    this.modelo.agregarVotoRespuesta(nombrePregunta, respuestaSeleccionada);
    }
  },
  modificarPregunta: function(idPregunta, pregunta) {
    if(idPregunta !== undefined && idPregunta >= 0 && pregunta !== undefined){
    this.modelo.modificarPregunta(idPregunta, pregunta);
    }
  },
  borrarTodasPreguntas: function() {
    this.modelo.borrarTodasPreguntas();
  },
};
