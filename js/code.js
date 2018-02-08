{

  (function(){

    let path_name, get_http,inputTexto, buttonShowDom, textAreaShowDom, info,
    info2, info3, READY_STATE_UNINITIALIZED, READY_STATE_LOADING, READY_STATE_LOADED, READY_STATE_INTERACTIVE,
    READY_STATE_COMPLETE;

    function initVars(){
      path_name = location.href;
      inputTexto = document.getElementById('recurso');
      buttonShowDom = document.getElementById('enviar');
      textAreaShowDom = document.getElementById('contenidos');
      info = document.getElementById('estados');
      info2 = document.getElementById('codigo');
      info3 = document.getElementById('cabeceras');

      READY_STATE_UNINITIALIZED=0;
      READY_STATE_LOADING=1;
      READY_STATE_LOADED=2;
      READY_STATE_INTERACTIVE=3;
      READY_STATE_COMPLETE=4;
    }

    function showResponses() {
      switch (get_http.readyState) {
        case READY_STATE_UNINITIALIZED:
        info.innerHTML += '<p>No inicializado (objeto creado, pero no se ha invocado el método open)</p>';
        break;
        case READY_STATE_LOADING:
        info.innerHTML += '<p>Cargando (objeto creado, pero no se ha invocado el método send)</p>';
        break;
        case READY_STATE_LOADED:
        info.innerHTML += '<p>Cargado (se ha invocado el método send, pero el servidor aún no ha respondido)</p>';
        break;
        case READY_STATE_INTERACTIVE:
        info.innerHTML += '<p>Interactivo (se han recibido algunos datos, aunque no se puede emplear la propiedad responseText)</p>';
        break;
        case READY_STATE_COMPLETE:
        info.innerHTML += '<p>Completo (se han recibido todos los datos de la respuesta del servidor)</p>';
        break;
      }
    }

    function showHeads(){
      info3.innerHTML += '<p>'+ get_http.getAllResponseHeaders()+'</p>';
    }

    function showStatus(){
      info2.innerHTML += '<p>'+get_http.status+'</p>';
    }

    function showContent(div){
      showResponses();
      showHeads();
      showStatus();

      if(get_http.readyState == READY_STATE_COMPLETE) {
        if (get_http.status == 200) {
          if (div.tagName == "TEXTAREA")div.value = get_http.responseText;
          else div.innerHTML = get_http.responseText;

        }
      }
    }

    function loadContent(url, method, func){
      get_http = new XMLHttpRequest();
      if(get_http) {
        get_http.onreadystatechange = func;
        get_http.open(method, url, true);
        get_http.send(null);
      }
    }

    function showUrl(){
      inputTexto.value = path_name;
    }

    function clearInfo(){
      inputTexto.value = "";
      textAreaShowDom.value = "";
      info.innerHTML = "";
      info2.innerHTML = "";
      info3.innerHTML = "";
    }

    window.addEventListener('load', function () {
      initVars();
      showUrl();

      buttonShowDom.addEventListener('click', function(){
        loadContent(inputTexto.value, "GET", function(){
          showContent(textAreaShowDom);
        });
      });

    });
  })();
}
