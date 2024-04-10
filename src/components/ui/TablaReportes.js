import React, { useEffect, useState } from "react";
import {
    Table,
    Row,
    Col,
    Input,
    Space,
    Button
} from "antd";
import {
    SearchOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import "./tablaReportes.css";
import BtnExcel from "./BtnExcel";


function TablaReportes() {

    const URL = process.env.REACT_APP_URL;
    const dateFormat = "DD/MM/YYYY";

    const [tableData, setTableData] = useState([]);

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});


    useEffect(() => {

        fetchDataProdxNeg()
            .catch(console.error);;

    }, []);

    //Cambia formato de numeros con miles a puntos Ej: 1000 -> 1.000
    const milesFormat = (number) => {
        return Number(number)?.toLocaleString('de-DE');
    };

    const fetchDataProdxNeg = async () => {
        const data = await fetch(`${URL}rep_getProdxNeg.php`);
        const jsonData = await data.json();

        setTableData(jsonData.map((item, index) => {
            return ({ ...item, key: index + 1, cantidad: milesFormat(item.cantidad), valor: milesFormat(item.valor), total: milesFormat(item.total) })
        }));
    };


    const columns = [
        {
            title: "PRODUCTO",
            dataIndex: "prod_desc",
            key: "prod_desc",
            align: "left",
            //defaultSortOrder: 'ascend',
            //className: "col-producto-ancho",
            sorter: {
                compare: (a, b) => a.prod_desc.localeCompare(b.prod_desc),
            },
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <div style={{ padding: '8px' }}>
                        <Input
                            className="input-buscador"
                            autoFocus
                            placeholder="Buscar..."
                            value={selectedKeys[0]}
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : [])
                            }}
                            onPressEnter={() => {
                                confirm();
                            }}
                            onBlur={() => {
                                confirm();
                            }}
                        >

                        </Input>
                        <Space>
                            <Button className="btn-buscador" size="small"
                                onClick={() => {
                                    confirm();
                                }}
                                type="primary"><SearchOutlined />Buscar</Button>

                            <Button className="btn-reset" size="small"
                                onClick={() => {
                                    clearFilters({ confirm: true, closeDropdown: true })
                                }}
                                type="default">Reiniciar</Button>
                        </Space>
                    </div>
                );
            },
            filterIcon: () => {
                return <SearchOutlined className="search-icon" />;
            },
            onFilter: (value, record) => {
                return record.prod_desc.toLowerCase().trim().includes(value.toLowerCase().trim())
            },
        },
        {
            title: "CANTIDAD",
            dataIndex: "cantidad",
            key: "cantidad",
            align: "right",
        },
        {
            title: "MONEDA",
            dataIndex: "mon_iso",
            key: "mon_iso",
            align: "center",
        },
        {
            title: "VALOR",
            dataIndex: "valor",
            key: "valor",
            align: "right",
            width: "50px"
        },
        {
            title: "TOTAL",
            dataIndex: "total",
            key: "total",
            align: "right",
        },
        {
            title: "EMBUDO",
            dataIndex: "pip_nombre",
            key: "pip_nombre",
            align: "left",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <div style={{ padding: '8px' }}>
                        <Input
                            className="input-buscador"
                            autoFocus
                            placeholder="Buscar..."
                            value={selectedKeys[0]}
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : [])
                            }}
                            onPressEnter={() => {
                                confirm();
                            }}
                            onBlur={() => {
                                confirm();
                            }}
                        >

                        </Input>
                        <Space>
                            <Button className="btn-buscador" size="small"
                                onClick={() => {
                                    confirm();
                                }}
                                type="primary"><SearchOutlined />Buscar</Button>

                            <Button className="btn-reset" size="small"
                                onClick={() => {
                                    clearFilters({ confirm: true, closeDropdown: true })
                                }}
                                type="default">Reiniciar</Button>
                        </Space>
                    </div>
                );
            },
            filterIcon: () => {
                return <SearchOutlined className="search-icon" />;
            },
            onFilter: (value, record) => {
                return record.pip_nombre.toLowerCase().trim().includes(value.toLowerCase().trim())
            },
        },
        {
            title: "NEGOCIO",
            dataIndex: "negocio",
            key: "negocio",
            align: "left",
            sorter: {
                compare: (a, b) => a.negocio.localeCompare(b.negocio),
            },
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <div style={{ padding: '8px' }}>
                        <Input
                            className="input-buscador"
                            autoFocus
                            placeholder="Buscar..."
                            value={selectedKeys[0]}
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : [])
                            }}
                            onPressEnter={() => {
                                confirm();
                            }}
                            onBlur={() => {
                                confirm();
                            }}
                        >

                        </Input>
                        <Space>
                            <Button className="btn-buscador" size="small"
                                onClick={() => {
                                    confirm();
                                }}
                                type="primary"><SearchOutlined />Buscar</Button>

                            <Button className="btn-reset" size="small"
                                onClick={() => {
                                    clearFilters({ confirm: true, closeDropdown: true })
                                }}
                                type="default">Reiniciar</Button>
                        </Space>
                    </div>
                );
            },
            filterIcon: () => {
                return <SearchOutlined className="search-icon" />;
            },
            onFilter: (value, record) => {
                return record.negocio.toLowerCase().trim().includes(value.toLowerCase().trim())
            },
        },
        {
            title: "CREACION",
            dataIndex: "neg_fechacreacion",
            key: "neg_fechacreacion",
            align: "center",
            sorter: {
                compare: (a, b) =>
                    dayjs(a.neg_fechacreacion, "YYYY-MM-DD") - dayjs(b.neg_fechacreacion, "YYYY-MM-DD"),
            },
            render: (neg_fechacreacion) => {
                return (
                    <>
                        {/* {dayjs(fila?.neg_fechacreacion).format(dateFormat)} */}
                        {dayjs(neg_fechacreacion).format(dateFormat)}
                    </>
                );
            },
        },
        {
            title: "CIERRE",
            dataIndex: "neg_fechacierreestimado",
            key: "neg_fechacierreestimado",
            align: "center",
            sorter: {
                compare: (a, b) =>
                    dayjs(a.neg_fechacierreestimado, "YYYY-MM-DD") - dayjs(b.neg_fechacierreestimado, "YYYY-MM-DD"),
            },
            render: (neg_fechacierreestimado) => {
                return (
                    <>
                        {dayjs(neg_fechacierreestimado).format(dateFormat)}
                    </>
                );
            },
        },
        {
            title: "CLIENTE",
            dataIndex: "cli_nombre",
            key: "cli_nombre",
            align: "left",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <div style={{ padding: '8px' }}>
                        <Input
                            className="input-buscador"
                            autoFocus
                            placeholder="Buscar..."
                            value={selectedKeys[0]}
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : [])
                            }}
                            onPressEnter={() => {
                                confirm();
                            }}
                            onBlur={() => {
                                confirm();
                            }}
                        >

                        </Input>
                        <Space>
                            <Button className="btn-buscador" size="small"
                                onClick={() => {
                                    confirm();
                                }}
                                type="primary"><SearchOutlined />Buscar</Button>

                            <Button className="btn-reset" size="small"
                                onClick={() => {
                                    clearFilters({ confirm: true, closeDropdown: true })
                                }}
                                type="default">Reiniciar</Button>
                        </Space>
                    </div>
                );
            },
            filterIcon: () => {
                return <SearchOutlined className="search-icon" />;
            },
            onFilter: (value, record) => {
                return record.cli_nombre.toLowerCase().trim().includes(value.toLowerCase().trim())
            },
        },
    ];

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };


    const handleExport = () => {
        // Obtener los datos filtrados y ordenados
        // console.log(filteredInfo);
        // console.log(sortedInfo);

        // Filtrar propiedades que son null
        let filterConditions = Object.keys(filteredInfo)
            .filter(key => filteredInfo[key] !== null)
            // .map(key => `item.${key} === filteredInfo.${key}[0]`)
            .map(key => `item.${key}.toLowerCase().trim().includes(filteredInfo.${key}[0].toLowerCase().trim())`)
            .join(' && ');
        // console.log('filterConditions: ', filterConditions)

        let resultados = [];

        if (!filterConditions) {
            // console.log('NO TIENE FILTROS');
            filterConditions = true;
        };

        resultados = tableData
            .filter(item => eval(filterConditions))
            .sort((a, b) => {
                const prop = sortedInfo?.column?.key;// Acceder a la propiedad de ordenamiento

                if (!prop) return 0; // No se está ordenando, devolver 0

                const valueA = a[prop];
                const valueB = b[prop];

                // Condicones para manejar tipos de datos diferentes
                if (prop === 'neg_fechacreacion' || prop === 'neg_fechacierreestimado') {
                    // console.log('TIPO DATE')
                    if (sortedInfo.order === 'ascend') {
                        return new Date(valueA) - new Date(valueB);
                    } else if (sortedInfo.order === 'descend') {
                        return new Date(valueB) - new Date(valueA);
                    }
                } else if (typeof valueA === 'number' && typeof valueB === 'number') {
                    // console.log('TIPO NUMBER')
                    if (sortedInfo.order === 'ascend') {
                        return valueA - valueB;
                    } else if (sortedInfo.order === 'descend') {
                        return valueB - valueA;
                    }
                } else if (typeof valueA === 'string' && typeof valueB === 'string') {
                    // console.log('TIPO STRING')
                    if (sortedInfo.order === 'ascend') {
                        return valueA.localeCompare(valueB);
                    } else if (sortedInfo.order === 'descend') {
                        return valueB.localeCompare(valueA);
                    }
                }

                // Otros tipos de datos o si no hay ordenamiento, mantener el orden original
                return 0;
            })

        // console.log('RESULTADO FINAL: ', resultados)
        return resultados
    };

    return (
        <>
            <Row className="div-boton">
                <Col xs={24} sm={24} md={12}>
                    <h3 className="titulo-modulo">PRODUCTOS POR NEGOCIO</h3>
                </Col>
            </Row>

            <BtnExcel columns={columns} dataSource={handleExport()} saveAsName={"ProductosPorNegocio"} />

            <Table
                size={"small"}
                dataSource={tableData}
                columns={columns}
                pagination={{
                    position: ["none", "bottomRight"],
                    showSizeChanger: false
                }}
                onChange={handleChange}
            />

        </>
    )
}

export default TablaReportes