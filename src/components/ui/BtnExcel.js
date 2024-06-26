import React from 'react'
import "./tablaReportes.css";
import { Button } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";
import { Excel } from "antd-table-saveas-excel";

function BtnExcel({columns, dataSource, saveAsName}) {

  const timestamp = Date.now();

    const handleClick = () => {
        // console.log('columns',columns)
        // console.log('dataSource', dataSource)
        
        const excel = new Excel();
        excel
          .addSheet("Hoja 1")
          .addColumns(columns) //parametro
          .addDataSource(dataSource, { //parametro
            str2Percent: true
          })
          .saveAs(`${saveAsName}_${timestamp}.xlsx`); //parametro
    };

  return (
    <div className='btn-export-contenedor'>
        <Button className='btn-export' onClick={handleClick} type='primary' icon={<FileExcelOutlined />} >Exportar</Button>
    </div>
  )
}

export default BtnExcel