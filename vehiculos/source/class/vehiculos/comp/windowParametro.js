qx.Class.define("vehiculos.comp.windowParametro",
{
	extend : componente.comp.ui.ramon.window.Window,
	construct : function ()
	{
	this.base(arguments);
	
		this.set({
			caption: "Parametros",
			width: 800,
			height: 600,
			showMinimize: false
		});
		
		this.setLayout(new qx.ui.layout.Canvas());

	this.addListenerOnce("appear", function(e){
		tblTaller.focus();
	});
	
	
	
	var application = qx.core.Init.getApplication();
	var numberformatMontoEs2 = new qx.util.format.NumberFormat("es").set({groupingUsed: true});
	
	
	
	
	var windowTaller = new vehiculos.comp.windowTaller();
	windowTaller.setModal(true);
	windowTaller.addListener("disappear", function(e){
		tblTaller.focus();
	});
	application.getRoot().add(windowTaller);
	
	
	var gbxTaller = new qx.ui.groupbox.GroupBox("Taller");
	gbxTaller.setLayout(new qx.ui.layout.Grow());
	this.add(gbxTaller, {left: 0, top: 0, right: "51.5%", bottom: "51.5%"});
	
	var tableModelTaller = new qx.ui.table.model.Simple();
	tableModelTaller.setColumns(["Descripción", "CUIT"], ["descrip", "cuit"]);
	tableModelTaller.setColumnSortable(0, false);
	tableModelTaller.setColumnSortable(1, false);

	var tblTaller = new componente.comp.ui.ramon.table.tableParametro(tableModelTaller, "taller", windowTaller);
	
	gbxTaller.add(tblTaller);
	
	
	
	var gbxTipo_vehiculo = new qx.ui.groupbox.GroupBox("Tipo de vehículo");
	gbxTipo_vehiculo.setWidth(350);
	gbxTipo_vehiculo.setHeight(261);
	gbxTipo_vehiculo.setLayout(new qx.ui.layout.Grow());
	this.add(gbxTipo_vehiculo, {left: "51.5%", top: 0, right: 0, bottom: "51.5%"});
	
	var tableModelTipo_vehiculo = new qx.ui.table.model.Simple();
	tableModelTipo_vehiculo.setColumns(["Descripción"], ["descrip"]);
	tableModelTipo_vehiculo.setEditable(true);
	tableModelTipo_vehiculo.setColumnSortable(0, false);

	//var tblTipo_vehiculo = new vehiculos.comp.tableParametro(tableModelTipo_vehiculo, "tipo_vehiculo");
	var tblTipo_vehiculo = new componente.comp.ui.ramon.table.tableParametro(tableModelTipo_vehiculo, "tipo_vehiculo");
	
	gbxTipo_vehiculo.add(tblTipo_vehiculo);
	
	
	var gbxTipo_incidente = new qx.ui.groupbox.GroupBox("Tipo de incidente");
	gbxTipo_incidente.setWidth(350);
	gbxTipo_incidente.setHeight(261);
	gbxTipo_incidente.setLayout(new qx.ui.layout.Grow());
	this.add(gbxTipo_incidente, {left: 0, top: "51.5%", right: "51.5%", bottom: 0});
	
	var tableModelTipo_incidente = new qx.ui.table.model.Simple();
	tableModelTipo_incidente.setColumns(["Descripción"], ["descrip"]);
	tableModelTipo_incidente.setEditable(true);
	tableModelTipo_incidente.setColumnSortable(0, false);

	//var tblTipo_incidente = new vehiculos.comp.tableParametro(tableModelTipo_incidente, "tipo_incidente");
	var tblTipo_incidente = new componente.comp.ui.ramon.table.tableParametro(tableModelTipo_incidente, "tipo_incidente");
	
	gbxTipo_incidente.add(tblTipo_incidente);
	
	
	var gbxTipo_reparacion = new qx.ui.groupbox.GroupBox("Tipo de reparación");
	gbxTipo_reparacion.setWidth(350);
	gbxTipo_reparacion.setHeight(261);
	gbxTipo_reparacion.setLayout(new qx.ui.layout.Grow());
	this.add(gbxTipo_reparacion, {left: "51.5%", top: "51.5%", right: 0, bottom: 0});
	
	var tableModelTipo_reparacion = new qx.ui.table.model.Simple();
	tableModelTipo_reparacion.setColumns(["Descripción"], ["descrip"]);
	tableModelTipo_reparacion.setEditable(true);
	tableModelTipo_reparacion.setColumnSortable(0, false);

	//var tblTipo_reparacion = new vehiculos.comp.tableParametro(tableModelTipo_reparacion, "tipo_reparacion");
	var tblTipo_reparacion = new componente.comp.ui.ramon.table.tableParametro(tableModelTipo_reparacion, "tipo_reparacion");
	
	gbxTipo_reparacion.add(tblTipo_reparacion);
	
	
	
	tblTaller.setTabIndex(3);
	tblTipo_vehiculo.setTabIndex(4);
	tblTipo_incidente.setTabIndex(5);
	tblTipo_reparacion.setTabIndex(6);
	
	
	},
	members : 
	{

	}
});