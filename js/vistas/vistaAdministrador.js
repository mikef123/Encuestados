/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEliminada.suscribir(function() { 
    contexto.reconstruirLista(); 
  });
  this.modelo.preguntasBorradas.suscribir(function() { 
    contexto.reconstruirLista(); 
  });
  this.modelo.modificarPreguntas.suscribir(function() { 
    contexto.reconstruirLista(); 
  });
  this.modelo.agregarRespuestas.suscribir(function() { 
    contexto.reconstruirLista(); 
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    this.modelo.cargar();
    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    // nuevoItem = document.createElement('li');
    // nuevoItem.className = "list-group-item";
    // nuevoItem.id = pregunta.id;
    // nuevoItem.textContent = pregunta.textoPregunta;

    var nuevoItem = $('<li/>',{
      'html': pregunta.textoPregunta,
      'class': 'list-group-item',
      'id': pregunta.id});
    
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function() {
        //completar
        var respuesta = $(this).val();
        var cantVotos = 0;
        if( respuesta !== "")
        {
          var respu = {'textoRespuesta': respuesta, 'cantidad': cantVotos};
          respuestas.push(respu);
        }
      })
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });

    //asociar el resto de los botones a eventos
    e.botonBorrarPregunta.click(function(){
      var id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.borrarPregunta(id);
    });

    //editar
    e.botonEditarPregunta.click(function(){
      var id = parseInt($('.list-group-item.active').attr('id'));
      var seleccion = prompt("selecciona 1 para modificar la pregunta, selecciona 2 para adicionar una respuesta")
      switch (seleccion) {
        case '1':
          var pregunta = prompt("Escribe una nueva pregunta")
          contexto.controlador.modificarPregunta(id, pregunta);
          break;
        case '2':
          var cantVotos = 0;
          var respuesta = prompt("Escribe una nueva respuesta")
          var respu = {'textoRespuesta': respuesta, 'cantidad': cantVotos};
          contexto.controlador.agregarRespuesta(id, respu);
          break;
      }
    });

    //Borrar todo
    e.borrarTodo.click(function(){
      contexto.controlador.borrarTodasPreguntas();
    });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
