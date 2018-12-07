<?php
session_start();

require("Base.php");

class class_Responsable extends class_Base
{
  

  public function method_alta_modifica_responsable($params, $error) {
  	$p = $params[0];
  	
  	/*
  	$sql = "SELECT dni FROM _personal WHERE dni='" . $p->model->dni . "'";
  	$rs = $this->mysqli->query($sql);
  	if ($rs->num_rows == 0) {
  		$error->SetError(0, "personal");
  		return $error;
  	}
  	*/
  	
  	$sql = "SELECT id_responsable FROM responsable WHERE dni='" . $p->model->dni . "' AND id_responsable <> " . $p->model->id_responsable;
  	$rs = $this->mysqli->query($sql);
  	if ($rs->num_rows > 0) {
  		$error->SetError(0, "dni");
  		return $error;
  	}

  	$sql = "SELECT id_responsable FROM responsable WHERE apenom='" . $p->model->apenom . "' AND id_responsable <> " . $p->model->id_responsable;
  	$rs = $this->mysqli->query($sql);
  	if ($rs->num_rows > 0) {
  		$error->SetError(0, "apenom");
  		return $error;
  	}
  	

	$set = $this->prepararCampos($p->model, "responsable");
		
	if ($p->model->id_responsable == "0") {
		$sql = "INSERT responsable SET " . $set;
		$this->mysqli->query($sql);
		
		$this->auditoria($sql, $this->mysqli->insert_id, "insert_responsable");
	} else {
		$sql = "UPDATE responsable SET " . $set . " WHERE id_responsable=" . $p->model->id_responsable;
		$this->mysqli->query($sql);
		
		$this->auditoria($sql, $p->model->id_responsable, "update_responsable");
	}
  }
  
  
  
  
  public function method_autocompletarResponsable($params, $error) {
  	$p = $params[0];
  	
  	if (is_numeric($p->texto)) {
  		$sql = "SELECT id_responsable AS model, CONCAT(dni, ' - ', apenom) AS label FROM responsable WHERE dni LIKE '%" . $p->texto . "%' ORDER BY label";
  	} else {
  		$sql = "SELECT id_responsable AS model, CONCAT(apenom, ' - ', dni) AS label FROM responsable WHERE apenom LIKE '%" . $p->texto . "%' ORDER BY label";
  	}
  	
	return $this->toJson($sql);
  }
  
  
  public function method_autocompletarResponsableCompleto($params, $error) {
  	$p = $params[0];
  	
  	$resultado = array();
  	
  	if (is_numeric($p->texto)) {
  		$sql = "SELECT id_responsable AS model, CONCAT(dni, ' - ', apenom) AS label, responsable.* FROM responsable WHERE dni LIKE '%" . $p->texto . "%' ORDER BY label";
  	} else {
  		$sql = "SELECT id_responsable AS model, CONCAT(apenom, ' - ', dni) AS label, responsable.* FROM responsable WHERE apenom LIKE '%" . $p->texto . "%' ORDER BY label";
  	}
  	
	$rs = $this->mysqli->query($sql);
	while ($row = $rs->fetch_object()) {
		$rowAux = new stdClass;
		
		$rowAux->model = $row->model;
		$rowAux->label = $row->label;
		
		unset($row->model);
		unset($row->label);
		
		$rowAux->responsable = $row;


		/*
		$sql = "SELECT";
		$sql.= "  CONCAT(_organismos_areas.organismo_area, ' (', CASE WHEN _organismos_areas.organismo_area_tipo_id='E' THEN _departamentos.departamento ELSE _organismos.organismo END, ')') AS label";
		$sql.= "  , _organismos_areas.organismo_area_id AS model";
		$sql.= " FROM (_organismos_areas INNER JOIN _organismos USING(organismo_id)) LEFT JOIN _departamentos ON _organismos_areas.organismo_areas_id_departamento=_departamentos.codigo_indec";
		$sql.= " WHERE _organismos_areas.organismo_area_id='" . $row->organismo_area_id . "'";
		
		$rsDependencia = $this->mysqli->query($sql);
		if ($rsDependencia->num_rows > 0) $rowAux->cboDependencia = $rsDependencia->fetch_object();
		*/

		$row = $rowAux;
		
		$resultado[] = $row;
	}
  	
	return $resultado;
  }
}

?>