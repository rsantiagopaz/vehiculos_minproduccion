qx.Class.define("vehiculos.comp.windowVehiculo",
{
	extend : componente.comp.ui.ramon.window.Window,
	construct : function ()
	{
	this.base(arguments);
	
	this.set({
		caption: "Nuevo vehículo",
		//width: 460,
		width: 800,
		height: 520,
		showMinimize: false,
		showMaximize: false,
		allowMaximize: false,
		resizable: false
	});
		
	this.setLayout(new qx.ui.layout.Canvas());

	this.addListenerOnce("appear", function(e){
		lstVehiculo.fireDataEvent("changeSelection", []);
		cboVehiculo.focus();
		
		
		/*
		var fineUploaderOptionsComodato = {
		    // options
			button: btnSeleccionarComodato.getContentElement().getDomElement(),
			autoUpload: true,
			request: {
				endpoint: 'services/php-traditional-server-master/endpoint.php'
			},
		    callbacks: {
		        onSubmit: function(id, name) {
		        	//application.popupCargando.mostrarModal();
		        },
		        
		        onError: function(id, name, errorReason, xhr) {
		        	alert(qx.lang.Json.stringify({id: id, name: name, errorReason: errorReason}, null, 2));
		        },
		        
		        onComplete: qx.lang.Function.bind(function(id, name, responseJSON, xhr) {
		        	//application.popupCargando.ocultarModal();
		        	
		        	if (responseJSON.success) {
		        		var p = {};
		        		p.uuid = responseJSON.uuid;
		        		p.uploadName = responseJSON.uploadName;
		        		
		        		//alert(qx.lang.Json.stringify(p, null, 2));
		        		
						var rpc = new qx.io.remote.Rpc("services/", "comp.Vehiculo");
						rpc.callAsync(qx.lang.Function.bind(function(resultado, error, id){
							//application.popupCargando.ocultarModal();
							
							//alert(qx.lang.Json.stringify(resultado, null, 2));
							//alert(qx.lang.Json.stringify(error, null, 2));
							
							imgComodato.setSource("");
							imgComodato.setSource("services/documentos/comodato_0.jpg");
						}, this), "agregar_foto_comodato", p);
		        	} else {
		        		//application.popupCargando.ocultarModal();
		        	}
		        }, this)
		    }
		};
		
		fineUploaderComodato = new qq.FineUploaderBasic(fineUploaderOptionsComodato);
		*/
		
		
		var fineUploaderOptionsVehiculo = {
		    // options
			button: btnSeleccionarVehiculo.getContentElement().getDomElement(),
			autoUpload: true,
			request: {
				endpoint: 'services/php-traditional-server-master/endpoint.php'
			},
		    callbacks: {
		        onSubmit: function(id, name) {
		        	//application.popupCargando.mostrarModal();
		        },
		        
		        onError: function(id, name, errorReason, xhr) {
		        	alert(qx.lang.Json.stringify({id: id, name: name, errorReason: errorReason}, null, 2));
		        },
		        
		        onComplete: qx.lang.Function.bind(function(id, name, responseJSON, xhr) {
		        	//application.popupCargando.ocultarModal();
		        	
		        	if (responseJSON.success) {
		        		var p = {};
		        		p.uuid = responseJSON.uuid;
		        		p.uploadName = responseJSON.uploadName;
		        		
		        		//alert(qx.lang.Json.stringify(p, null, 2));
		        		
						var rpc = new qx.io.remote.Rpc("services/", "comp.Vehiculo");
						rpc.callAsync(qx.lang.Function.bind(function(resultado, error, id){
							//application.popupCargando.ocultarModal();
							
							//alert(qx.lang.Json.stringify(resultado, null, 2));
							//alert(qx.lang.Json.stringify(error, null, 2));
							
							imgVehiculo.setSource("");
							imgVehiculo.setSource("services/documentos/vehiculo_0.jpg");
						}, this), "agregar_foto_vehiculo", p);
		        	} else {
		        		//application.popupCargando.ocultarModal();
		        	}
		        }, this)
		    }
		};
		
		fineUploaderVehiculo = new qq.FineUploaderBasic(fineUploaderOptionsVehiculo);
		
		this.add(imgComodato, {right: 0, top: 40});
		this.add(imgVehiculo, {right: 0, top: 220});
	}, this);
	
	
	var application = qx.core.Init.getApplication();
	
	
	var cboVehiculo = new componente.comp.ui.ramon.combobox.ComboBoxAuto({url: "services/", serviceName: "comp.Vehiculo", methodName: "autocompletarVehiculoCompleto"});
	cboVehiculo.setWidth(175);
	var lstVehiculo = cboVehiculo.getChildControl("list");
	lstVehiculo.addListener("changeSelection", function(e){
		var datos, modelForm;
		
		txtNro_patente.setValid(true);

		if (lstVehiculo.isSelectionEmpty()) {
			this.setCaption("Nuevo vehículo");
			
			datos = {nro_patente: "", marca: "", id_tipo_vehiculo: null, modelo: "", nro_motor: "", nro_chasis: "", observa: "", nro_poliza: "", id_responsable: "0", cboDependencia: "", cboResponsable: "", organismo_area_id: null, id_vehiculo: "0"};
			
			cboDependencia.removeAll();
			cboDependencia.setValue("");
			
			cboResponsable.removeAll();
			cboResponsable.setValue("");
		} else {
			this.setCaption("Modificar vehículo");
			datos = lstVehiculo.getSelection()[0].getUserData("datos");
			datos.vehiculo.cboDependencia = "";
			datos.vehiculo.cboResponsable = "";
			
			if (datos.cboDependencia == null) {
				cboDependencia.removeAll();
				cboDependencia.setValue("");
			} else {
				cboDependencia.add(new qx.ui.form.ListItem(datos.cboDependencia.label, null, datos.cboDependencia.model));
			}
			
			if (datos.cboResponsable == null) {
				cboResponsable.removeAll();
				cboResponsable.setValue("");
			} else {
				cboResponsable.add(new qx.ui.form.ListItem(datos.cboResponsable.label, null, datos.cboResponsable.model));
			}
			
			datos = datos.vehiculo;
		}
		
		modelForm = qx.data.marshal.Json.createModel(datos, true);
		controllerFormInfoVehiculo.setModel(modelForm);
	}, this);
	
	this.add(new qx.ui.basic.Label("Buscar:"), {left: 55, top: 3});
	this.add(cboVehiculo, {left: 100, top: 0});
	cboVehiculo.setTabIndex(1);
	
	var lblLinea = new qx.ui.basic.Label("<hr>");
	lblLinea.setRich(true);
	lblLinea.setWidth(1000);
	this.add(lblLinea, {left: 0, top: 22, right: 0});
	
	
	
	
	
	
	var formInfoVehiculo = new qx.ui.form.Form();
	
	var txtNro_patente = new qx.ui.form.TextField();
	txtNro_patente.setRequired(true);
	txtNro_patente.addListener("blur", function(e){
		var value = this.getValue();
		this.setValue((value == null) ? "" : value.trim().toUpperCase());
	});
	formInfoVehiculo.add(txtNro_patente, "Nro.patente", null, "nro_patente", null, {tabIndex: 3, item: {row: 1, column: 1, colSpan: 4}});
	
	var aux = new qx.ui.form.TextField();
	aux.addListener("blur", function(e){
		var value = this.getValue();
		this.setValue((value == null) ? "" : value.trim());
	});
	formInfoVehiculo.add(aux, "Marca", null, "marca", null, {item: {row: 2, column: 1, colSpan: 8}});
	

	aux = new qx.ui.form.SelectBox();
	var rpc = new vehiculos.comp.rpc.Rpc("services/", "comp.Vehiculo");
	try {
		var resultado = rpc.callSync("autocompletarTipo_vehiculo", {texto: ""});
	} catch (ex) {
		alert("Sync exception: " + ex);
	}
	for (var x in resultado) {
		aux.add(new qx.ui.form.ListItem(resultado[x].label, null, resultado[x].model));
	}
	
	formInfoVehiculo.add(aux, "Tipo", null, "id_tipo_vehiculo", null, {item: {row: 3, column: 1, colSpan: 8}});

	
	aux = new qx.ui.form.TextField();
	aux.addListener("blur", function(e){
		var value = this.getValue();
		this.setValue((value == null) ? "" : value.trim());
	});
	formInfoVehiculo.add(aux, "Modelo (año)", null, "modelo", null, {item: {row: 4, column: 1, colSpan: 2}});
	
	aux = new qx.ui.form.TextField();
	aux.addListener("blur", function(e){
		var value = this.getValue();
		this.setValue((value == null) ? "" : value.trim());
	});
	formInfoVehiculo.add(aux, "Nro.motor", null, "nro_motor", null, {item: {row: 5, column: 1, colSpan: 6}});
	
	aux = new qx.ui.form.TextField();
	aux.setRequired(true);
	aux.addListener("blur", function(e){
		var value = this.getValue();
		this.setValue((value == null) ? "" : value.trim());
	});
	formInfoVehiculo.add(aux, "Nro.chasis", null, "nro_chasis", null, {item: {row: 6, column: 1, colSpan: 6}});
	
	aux = new qx.ui.form.TextArea();
	aux.addListener("blur", function(e){
		var value = this.getValue();
		this.setValue((value == null) ? "" : value.trim());
	});
	formInfoVehiculo.add(aux, "Observaciones", null, "observa", null, {item: {row: 7, column: 1, colSpan: 8}});
	
	
	aux = new qx.ui.form.TextField();
	aux.addListener("blur", function(e){
		var value = this.getValue();
		this.setValue((value == null) ? "" : value.trim());
	});
	formInfoVehiculo.add(aux, "Nro.seguro/póliza", null, "nro_poliza", null, {item: {row: 8, column: 1, colSpan: 6}});
	
	
	var cboDependencia = new componente.comp.ui.ramon.combobox.ComboBoxAuto({url: "services/", serviceName: "comp.Vehiculo", methodName: "autocompletarDependencia"});
	cboDependencia.setRequired(true);
	formInfoVehiculo.add(cboDependencia, "Dependencia", function(value) {
		if (lstDependencia.isSelectionEmpty()) throw new qx.core.ValidationError("Validation Error", "Debe seleccionar dependencia");
	}, "cboDependencia", null, {item: {row: 9, column: 1, colSpan: 13}});
	var lstDependencia = cboDependencia.getChildControl("list");
	formInfoVehiculo.add(lstDependencia, "", null, "organismo_area_id");
	
	

	var cboResponsable = new componente.comp.ui.ramon.combobox.ComboBoxAuto({url: "services/", serviceName: "comp.Responsable", methodName: "autocompletarResponsable"});
	cboResponsable.setRequired(true);
	formInfoVehiculo.add(cboResponsable, "Responsable", function(value) {
		if (lstResponsable.isSelectionEmpty()) throw new qx.core.ValidationError("Validation Error", "Debe seleccionar responsable");
	}, "cboResponsable", null, {item: {row: 10, column: 1, colSpan: 13}});
	var lstResponsable = cboResponsable.getChildControl("list");
	formInfoVehiculo.add(lstResponsable, "", null, "id_responsable");

	

	var controllerFormInfoVehiculo = new qx.data.controller.Form(null, formInfoVehiculo);
	//modelForm = controllerFormInfoVehiculo.createModel(true);
	
	var formViewVehiculo = new componente.comp.ui.ramon.abstractrenderer.Grid(formInfoVehiculo, 20, 20);
	//var formViewVehiculo = new qx.ui.form.renderer.Single(formInfoVehiculo);
	this.add(formViewVehiculo, {left: 0, top: 45});
	
	

	
	// Menu
	
	var menuComodato = new componente.comp.ui.ramon.menu.Menu();
	
	var btnSeleccionarComodato = new qx.ui.menu.Button("Seleccionar...");
	btnSeleccionarComodato.addListenerOnce("appear", function(e){
		var fineUploaderOptionsComodato = {
		    // options
			button: btnSeleccionarComodato.getContentElement().getDomElement(),
			autoUpload: true,
			request: {
				endpoint: 'services/php-traditional-server-master/endpoint.php'
			},
		    callbacks: {
		        onSubmit: function(id, name) {
		        	//application.popupCargando.mostrarModal();
		        },
		        
		        onError: function(id, name, errorReason, xhr) {
		        	alert(qx.lang.Json.stringify({id: id, name: name, errorReason: errorReason}, null, 2));
		        },
		        
		        onComplete: qx.lang.Function.bind(function(id, name, responseJSON, xhr) {
		        	//application.popupCargando.ocultarModal();
		        	
		        	if (responseJSON.success) {
		        		var p = {};
		        		p.uuid = responseJSON.uuid;
		        		p.uploadName = responseJSON.uploadName;
		        		
		        		//alert(qx.lang.Json.stringify(p, null, 2));
		        		
						var rpc = new qx.io.remote.Rpc("services/", "comp.Vehiculo");
						rpc.callAsync(qx.lang.Function.bind(function(resultado, error, id){
							//application.popupCargando.ocultarModal();
							
							//alert(qx.lang.Json.stringify(resultado, null, 2));
							//alert(qx.lang.Json.stringify(error, null, 2));
							
							imgComodato.setSource(null);
							imgComodato.setSource("./services/documentos/comodato_0.jpg");
						}, this), "agregar_foto_comodato", p);
		        	} else {
		        		//application.popupCargando.ocultarModal();
		        	}
		        }, this)
		    }
		};
		
		fineUploaderComodato = new qq.FineUploaderBasic(fineUploaderOptionsComodato);
	}, this);
	
	btnSeleccionarComodato.addListener("execute", function(e){

	});
	menuComodato.add(btnSeleccionarComodato);
	menuComodato.memorizar();
	
	var lblComodato = new qx.ui.basic.Label("Foto comodato:");
	this.add(lblComodato, {right: 190, top: 40});
	
	var imgComodato = new qx.ui.basic.Image();
	imgComodato.setWidth(180);
	imgComodato.setHeight(160);
	imgComodato.setBackgroundColor("#FFFFFF");
	imgComodato.setDecorator("main");
	imgComodato.setScale(true);
	imgComodato.setContextMenu(menuComodato);
	
	this.add(imgComodato, {right: 10, top: 30});
	
	var fineUploaderComodato;
	
	
	
	// Menu
	
	var menuVehiculo = new componente.comp.ui.ramon.menu.Menu();
	
	var btnSeleccionarVehiculo = new qx.ui.menu.Button("Seleccionar...");
	btnSeleccionarVehiculo.addListener("execute", function(e){

	});
	menuVehiculo.add(btnSeleccionarVehiculo);
	menuVehiculo.memorizar();
	
	var lblVehiculo = new qx.ui.basic.Label("Foto vehículo:");
	this.add(lblVehiculo, {right: 190, top: 220});
	
	var imgVehiculo = new qx.ui.basic.Image();
	imgVehiculo.setWidth(180);
	imgVehiculo.setHeight(160);
	imgVehiculo.setBackgroundColor("#FFFFFF");
	imgVehiculo.setDecorator("main");
	imgVehiculo.setScale(true);
	imgVehiculo.setContextMenu(menuVehiculo);
	this.add(imgVehiculo, {right: 10, top: 50});
	
	var fineUploaderVehiculo;

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	var btnAceptar = new qx.ui.form.Button("Grabar");
	btnAceptar.addListener("execute", function(e){
		if (formInfoVehiculo.validate()) {
			var p = {};
			p.model = qx.util.Serializer.toNativeObject(controllerFormInfoVehiculo.getModel());

			var rpc = new vehiculos.comp.rpc.Rpc("services/", "comp.Vehiculo");
			
			rpc.addListener("completed", function(e){
				var data = e.getData();
				
				application.popupGrabado.placeToWidget(this, true);
				application.popupGrabado.show();

				if (p.model.id_vehiculo == "0") {
					lstVehiculo.fireDataEvent("changeSelection", []);
					txtNro_patente.focus();
				} else {
					cboVehiculo.setValue("");
					lstVehiculo.removeAll();
					cboVehiculo.focus();
				}
			}, this);
			
			rpc.addListener("failed", function(e){
				var data = e.getData();
				
				if (data.message == "duplicado") {
					txtNro_patente.setInvalidMessage("Nro.patente duplicado");
					txtNro_patente.setValid(false);
					txtNro_patente.focus();
					
					var manager = qx.ui.tooltip.Manager.getInstance();
					manager.showToolTip(txtNro_patente);
				}
			}, this);
			
			rpc.callAsyncListeners(true, "alta_modifica_vehiculo", p);
			
			
			
			
			
		} else {
			formInfoVehiculo.getValidationManager().getInvalidFormItems()[0].focus();
		}
	}, this);
	
	var btnCancelar = new qx.ui.form.Button("Cerrar");
	btnCancelar.addListener("execute", function(e){
		this.destroy();
	}, this);
	
	this.add(btnAceptar, {left: "25%", bottom: 0});
	this.add(btnCancelar, {right: "25%", bottom: 0});
	
	btnAceptar.setTabIndex(20);
	btnCancelar.setTabIndex(21);
	
	
	},
	members : 
	{

	},
	events : 
	{
		"aceptado": "qx.event.type.Event"
	}
});