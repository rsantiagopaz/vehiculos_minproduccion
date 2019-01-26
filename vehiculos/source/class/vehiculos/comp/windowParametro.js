qx.Class.define("vehiculos.comp.windowParametro",
{
	extend : componente.comp.ui.ramon.window.Window,
	construct : function ()
	{
	this.base(arguments);
	
		this.set({
			caption: "Parametros",
			width: 1000,
			height: 600,
			showMinimize: false
		});
		
		this.setLayout(new qx.ui.layout.Canvas());

	this.addListenerOnce("appear", function(e){
		cboProveed.focus();
	});
	
	
	
	var application = qx.core.Init.getApplication();
	var numberformatMontoEs2 = new qx.util.format.NumberFormat("es").set({groupingUsed: true});
	
	var functionActualizarTaller = function(cod_razon_social) {
		var rpc = new vehiculos.comp.rpc.Rpc("services/", "comp.Parametros");
		rpc.addListener("completed", function(e){
			var data = e.getData();

			tableModelTaller.setDataAsMapArray(data.result, true);
			
			//alert(qx.lang.Json.stringify(resultado, null, 2));
			
			if (cod_razon_social != null) tblTaller.buscar("cod_razon_social", cod_razon_social);
		}, this);
		rpc.callAsyncListeners(true, "leer_taller");
		
	};
	
	
	var gbxTaller = new qx.ui.groupbox.GroupBox("Talleres/Proveedores");
	gbxTaller.setLayout(new qx.ui.layout.Canvas());
	this.add(gbxTaller, {left: 0, top: 0, right: "67.00%", bottom: "51.5%"});
	
	var cboProveed = new componente.comp.ui.ramon.combobox.ComboBoxAuto({url: "services/", serviceName: "comp.Parametros", methodName: "autocompletarRazonSocial"});
	var lstProveed = cboProveed.getChildControl("list");
	
	gbxTaller.add(cboProveed, {left: 50, top: 0, right: 0});
	gbxTaller.add(new qx.ui.basic.Label("Buscar:"), {left: 0, top: 3});
	
	
	var btnAgregarTaller = new qx.ui.form.Button("Agregar");
	btnAgregarTaller.addListener("execute", function(e){
		if (! lstProveed.isSelectionEmpty()) {
			var p = {};
			p.cod_razon_social = lstProveed.getSelection()[0].getModel();
			
			var rpc = new vehiculos.comp.rpc.Rpc("services/", "comp.Parametros");
			rpc.addListener("completed", function(e){
				var data = e.getData();
	
				cboProveed.resetValue();
				lstProveed.removeAll();
				functionActualizarTaller(p.cod_razon_social);
				
				cboProveed.focus();
			}, this);
			rpc.callAsyncListeners(true, "agregar_taller", p);

		}
	});
	gbxTaller.add(btnAgregarTaller, {left: 50, top: 30});
	
	
	
	
	//Tabla

	var tableModelTaller = new qx.ui.table.model.Simple();
	tableModelTaller.setColumns(["Descripción"], ["descrip"]);

	var custom = {tableColumnModel : function(obj) {
		return new qx.ui.table.columnmodel.Resize(obj);
	}};
	
	var tblTaller = new componente.comp.ui.ramon.table.Table(tableModelTaller, custom);
	//tblTotales.toggleShowCellFocusIndicator();
	tblTaller.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.SINGLE_SELECTION);
	tblTaller.setShowCellFocusIndicator(false);
	tblTaller.toggleColumnVisibilityButtonVisible();
	//tblTaller.toggleStatusBarVisible();
	
	var tableColumnModelTaller = tblTaller.getTableColumnModel();
	
	tableModelTaller.addListener("dataChanged", function(e){
		var rowCount = tableModelTaller.getRowCount();
		if (rowCount > 0) tblTaller.setAdditionalStatusBarText(numberformatMontoEs2.format(rowCount) + " item/s"); else tblTaller.setAdditionalStatusBarText(" ");
	});
	
	gbxTaller.add(tblTaller, {left: 0, top: 60, right: 0, bottom: 0});
	
	functionActualizarTaller();
	
	
	
	
	
	
	

	
	
	
	var gbxTipo_vehiculo = new qx.ui.groupbox.GroupBox("Tipo de vehículo");
	gbxTipo_vehiculo.setLayout(new qx.ui.layout.Grow());
	this.add(gbxTipo_vehiculo, {left: "34.00%", top: 0, right: "34.00%", bottom: "51.5%"});
	
	var tableModelTipo_vehiculo = new qx.ui.table.model.Simple();
	tableModelTipo_vehiculo.setColumns(["Descripción"], ["descrip"]);
	tableModelTipo_vehiculo.setEditable(true);
	tableModelTipo_vehiculo.setColumnSortable(0, false);

	var tblTipo_vehiculo = new componente.comp.ui.ramon.table.tableParametro(tableModelTipo_vehiculo, "tipo_vehiculo");
	
	gbxTipo_vehiculo.add(tblTipo_vehiculo);
	
	
	
	var gbxTipo_reparacion = new qx.ui.groupbox.GroupBox("Tipo de reparación");
	gbxTipo_reparacion.setLayout(new qx.ui.layout.Grow());
	this.add(gbxTipo_reparacion, {left: "67.00%", top: 0, right: 0, bottom: "51.5%"});
	
	var tableModelTipo_reparacion = new qx.ui.table.model.Simple();
	tableModelTipo_reparacion.setColumns(["Descripción"], ["descrip"]);
	tableModelTipo_reparacion.setEditable(true);
	tableModelTipo_reparacion.setColumnSortable(0, false);

	var tblTipo_reparacion = new componente.comp.ui.ramon.table.tableParametro(tableModelTipo_reparacion, "tipo_reparacion");
	
	gbxTipo_reparacion.add(tblTipo_reparacion);
	
	
	
	var gbxTipo_incidente = new qx.ui.groupbox.GroupBox("Tipo de incidente");
	gbxTipo_incidente.setLayout(new qx.ui.layout.Grow());
	this.add(gbxTipo_incidente, {left: 0, top: "51.5%", right: "67.00%", bottom: 0});
	
	var tableModelTipo_incidente = new qx.ui.table.model.Simple();
	tableModelTipo_incidente.setColumns(["Descripción"], ["descrip"]);
	tableModelTipo_incidente.setEditable(true);
	tableModelTipo_incidente.setColumnSortable(0, false);

	var tblTipo_incidente = new componente.comp.ui.ramon.table.tableParametro(tableModelTipo_incidente, "tipo_incidente");
	
	gbxTipo_incidente.add(tblTipo_incidente);
	
	
	
	var gbxDependencia = new qx.ui.groupbox.GroupBox("Dependencia");
	gbxDependencia.setLayout(new qx.ui.layout.Grow());
	this.add(gbxDependencia, {left: "34.00%", top: "51.5%", right: "34.00%", bottom: 0});
	
	var tableModelDependencia = new qx.ui.table.model.Simple();
	tableModelDependencia.setColumns(["Descripción"], ["descrip"]);
	tableModelDependencia.setEditable(true);
	tableModelDependencia.setColumnSortable(0, false);

	var tblDependencia = new componente.comp.ui.ramon.table.tableParametro(tableModelDependencia, "dependencia");
	
	gbxDependencia.add(tblDependencia);
	
	
	
	var gbxDepositario = new qx.ui.groupbox.GroupBox("Depositario");
	gbxDepositario.setLayout(new qx.ui.layout.Grow());
	this.add(gbxDepositario, {left: "67.00%", top: "51.5%", right: 0, bottom: 0});
	
	var tableModelDepositario = new qx.ui.table.model.Simple();
	tableModelDepositario.setColumns(["Descripción"], ["descrip"]);
	tableModelDepositario.setEditable(true);
	tableModelDepositario.setColumnSortable(0, false);

	var tblDepositario = new componente.comp.ui.ramon.table.tableParametro(tableModelDepositario, "depositario");
	
	gbxDepositario.add(tblDepositario);
	
	

	
	
	
	cboProveed.setTabIndex(1);
	btnAgregarTaller.setTabIndex(2);
	tblTaller.setTabIndex(3);
	tblTipo_vehiculo.setTabIndex(4);
	tblTipo_reparacion.setTabIndex(5);
	tblTipo_incidente.setTabIndex(6);
	tblDependencia.setTabIndex(7);
	tblDepositario.setTabIndex(8);
	
	
	
	},
	members : 
	{

	}
});