/* 
 * Permite la actualización de la información de órdenes de producción
 * Demostración de las posibilidades más usuales de un elemento jqGrid
 */

$(function () {

    $(window).resize(); // forzar un resize para detectar el ancho del contenedor (ver index.js)
    var anchoGrid = anchoContenedor; // se asigna a una variable local el ancho del contenedor
    var altoGrid = $(window).height() - 350;

    if (altoGrid < 200) {
        altoGrid = 200;
    }

    var clase = 'equipos_para_prestamos';  // la clase que implementa el CRUD para este grid
    var idPager = 'equipos_para_prestamos-pager';  // la barra de navegación del grid ubicada en la parte inferior

    var field1, check_function1 = function (value, colname)
    {

        if (colname === "nombre") {
            field1 = value;
        }

        if (value.length < 3) {
            return [false, "El nombre debe tener minimo 3 caracteres"];
        } else
        {
            return [true];
        }

        return [true];
    };

    var field1, check_function2 = function (value, colname)
    {

        if (colname === "descripcion") {
            field1 = value;
        }

        if (value.length >51 ) {
            
            return [false, "la descripcion debe tener maximo de 50 caracateres"];
        } else
        {
            return [true];
        }

        return [true];
    };
    // las columnas de un grid se definen como un array de objetos con múltiples atributos
    var columnas = [
        /*{'label': 'Id Equipo para Préstamo', name: 'id_equipo_para_prestamo', index: 'id_equipo_para_prestamo', width: 100, sortable: true,editable: true, editrules: {required: true, number: false, minValue: 1},
            editoptions: {
                defaultValue:function()
                {
                    return jQuery("#equipos_para_prestamos-grid").jqGrid('getGridParam', 'records') +1;
                }
                
            }
        },*/
    	{'label': 'Nombre', name: 'nombre', index: 'nombre', width: 100, sortable: true, editable:true, editrules: {required: true, number: false, minValue: 1, custom: true, custom_func: check_function1},editoptions: {dataInit: asignarAncho}
        },
		{'label': 'Descripción', name: 'descripcion', index: 'descripcion', width: 100, sortable: true, editable: true,editrules: {required: true, number: false, minValue: 1, custom: true, custom_func: check_function2},editoptions: {dataInit: asignarAncho}
        },
		{'label': 'Estado', name: 'estado', index: 'estado', width: 100, sortable: true, editable: true,editrules: {required: true, number: false, minValue: 1},edittype:'select',
            editoptions: {
                dataInit: asignarAncho,
                value:"correcto:correcto;dañado:dañado;reparacion:reparacion"
            }			
        },		
		

    ];


    // inicializa el grid
    var grid = jQuery('#equipos_para_prestamos-grid').jqGrid({
        url: 'controlador/fachada.php',
        datatype: "json",
        mtype: 'POST',
        postData: {
            clase: clase,
            oper: 'select'
        },
        rowNum: 10,
        rowList: [10, 20, 30],
        colModel: columnas,
        autowidth: false,
        shrinkToFit: false,
        sortname: 'id_equipo_para_prestamo', // <-- OJO pueden ir varias columnas separadas por comas
        sortorder: "asc",
        height: altoGrid,
        width: anchoGrid,
        pager: "#" + idPager,
        viewrecords: true,
        caption: "Equipos Para Préstamos",
        multiselect: false,
        multiboxonly: true,
        hiddengrid: false,
        cellurl: 'controlador/fachada.php?clase=' + clase,
        cellsubmit: 'remote', // enviar cada entrada
        gridComplete: function () {
            // hacer algo...
        },
        loadError: function (jqXHR, textStatus, errorThrown) {
            alert('Error. No se tiene acceso a los datos de órdenes de producción.')
            console.log('textStatus: ' + textStatus);
            console.log(errorThrown);
            console.log(jqXHR.responseText);
        },
        editurl: "controlador/fachada.php?clase=" + clase
    });

    // inicializa los elementos de la barra de navegación del grid
    grid.jqGrid('navGrid', "#" + idPager, {
        refresh: true,
        edit: true,
        add: true,
        del: true,
        view: false,
        search: true,
        closeOnEscape: false,     


    }, {// edit
        width: 420,
        modal: true,
        afterSubmit: respuestaServidor
    }, {// add
        width: 420,
        modal: true,    
        //respuestaServidor
    }, {// del
        width: 335,
        modal: true, // jqModal: true,
        afterSubmit: respuestaServidor
    }, {// búsqueda
        multipleSearch: true,
        multipleGroup: true}, {}
    );

    /**
     * Asigna ancho a un elemento del grid
     * @param {type} elemento El nombre del elemento 
     * @returns {undefined}
     */
    function asignarAncho(elemento) {
        $(elemento).width(260);
    }

    /**
     * Validación personalizada de los campos de un jqGrid
     * @param {type} valor el dato contenido en un campo
     * @param {type} columna nombre con que está etiquetada la columna
     * @returns {Array} un array indicando si la validación fue exitosa o no
     */
    function validarOrdenProduccion(valor, columna) {

        if (columna == 'id_equipo_para_prestamo') {
            if (valor === '0') {
                return [false, "Falta seleccionar identificador de equipo para prestamo"];
            }
        }
        if (columna == 'nombre') {
            if (valor === '0') {
                return [false, "Falta seleccionar nombre de equipo para prestamo"];
            }
        }
        if (columna=='descripcion') 
        {
            if (valor === '0') {
                return [false, "Falta seleccionar descripcion de equipo para prestamo"];
            }   
        }
        if (columna=='estado') 
        {
            if (valor === '0') {
                return [false, "Falta seleccionar estado de equipo para prestamo"];
            }   
        }
        return [true, ""];
    }

});// JavaScript Document