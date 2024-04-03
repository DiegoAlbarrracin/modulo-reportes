import React, { useContext, useEffect, useState } from "react";
import {
    Button,
    Drawer,
    Table,
    Modal,
    Divider,
    Row,
    Col,
    Input,
    App
} from "antd";
import {
    EditOutlined,
    EyeOutlined,
    CloseOutlined,
    SearchOutlined,
    MailOutlined,
    CalendarOutlined,
    PhoneOutlined,
    MobileOutlined,
    UserOutlined,
    TagsOutlined,
    TeamOutlined,
    DeleteOutlined,
    ExclamationCircleFilled
} from "@ant-design/icons";
import "./tablaReportes.css";
import BtnExcel from "./BtnExcel";


function TablaReportes() {

    const URL = process.env.REACT_APP_URL;

    const [tableData, setTableData] = useState([]);


    useEffect(() => {

        fetchDataProdxNeg()
            .catch(console.error);;

    }, []);


    const fetchDataProdxNeg = async () => {
        const data = await fetch(`${URL}rep_getProdxNeg.php`);
        const jsonData = await data.json();

        setTableData(jsonData.map((item, index) => {
            return ({ ...item, key: index + 1 })
        }));
    };


    const columns = [
        {
            title: "PRODUCTO",
            dataIndex: "prod_desc",
            key: "prod_desc",
            align: "left",
            className: "col-producto-ancho",
            // sorter: {
            //     compare: (a, b) => a.producto.localeCompare(b.producto),
            // },
            // render: (fila) => {
            //     return (
            //         <>
            //             <Link className="icon-color" onClick={() => seleccionarContacto(fila, 'verDetalle')}>{fila.nombre}</Link>
            //         </>
            //     );
            // },
        },
        {
            title: "CANTIDAD",
            dataIndex: "cantidad",
            key: "cantidad",
            align: "left",
            // width: "20px"
            // sorter: {
            //     compare: (a, b) => a.cantidad.localeCompare(b.cantidad),
            // },
        },
        {
            title: "NEG_ID",
            dataIndex: "neg_id",
            key: "neg_id",
            align: "right",
            width: "50px"
        },
        {
            title: "ASUNTO",
            dataIndex: "neg_asunto",
            key: "neg_asunto",
            align: "left",
            className: "col-asunto-ancho",
        },
        {
            title: "CREACION",
            dataIndex: "neg_fechacreacion",
            key: "neg_fechacreacion",
            align: "center",
            className: "col-creacion-ancho",
            // sorter: {
            //     compare: (a, b) => a.creacion?.localeCompare(b.creacion),
            // },
        },
        {
            title: "CIERRE",
            dataIndex: "neg_fechacierre",
            key: "neg_fechacierre",
            align: "center",
            //defaultSortOrder: 'ascend',
            // sorter: {
            //     compare: (a, b) =>
            //         dayjs(a.fechaNac, "DD-MM-YYYY") - dayjs(b.fechaNac, "DD-MM-YYYY"),
            // },
        },
        {
            title: "IMPORTE",
            dataIndex: "neg_valor",
            key: "neg_valor",
            align: "right",
        },
        {
            title: "MONEDA",
            dataIndex: "mon_iso",
            key: "mon_iso",
            align: "center",
        },
        // {
        //     title: "...",
        //     key: "acciones",
        //     align: "center",
        //     render: (fila) => {
        //         return (
        //             <>
        //                 <div className="btn-contenedor">
        //                     <EyeOutlined className="icon-color" onClick={() => seleccionarContacto(fila, 'verDetalle')} />
        //                     <EditOutlined className="icon-color" onClick={() => seleccionarContacto(fila, 'editar')} />
        //                     <TeamOutlined className="icon-color" onClick={() => seleccionarContacto(fila, 'clientesAsoc')} />
        //                     <TagsOutlined className="icon-color" onClick={() => seleccionarContacto(fila, 'etiqueta')} />
        //                 </div>
        //             </>
        //         );
        //     },
        // }
    ];

    return (
        <>
            <Row className="div-boton">
                <Col xs={24} sm={24} md={12}>
                    <h3 className="titulo-modulo">PRODUCTOS POR NEGOCIO</h3>
                </Col>
            </Row>

            <BtnExcel columns={columns} dataSource={tableData} saveAsName={"ProductosPorNegocio"} />


            <Table
                size={"small"}
                dataSource={tableData}
                columns={columns}
                pagination={{
                    position: ["none", "bottomRight"],
                    showSizeChanger: false
                }}
            />

        </>
    )
}

export default TablaReportes