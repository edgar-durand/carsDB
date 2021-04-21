/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col, Button, ModalHeader, Modal, UncontrolledTooltip,
} from "reactstrap";
import vehiclesDB from "./vehiclesDB";
import NotificationAlert from "react-notification-alert";
import i18n from "../../i18n";

function Tables() {
    const [modalSearch, setmodalSearch] = React.useState(false);
    const [add, setAdd] = React.useState({
        tagName: "",
        identifier: "",
        trademark: "",
        cab: null
    });
    const tagName = i18n._language('views.vehicles.columns.tagName');
    const identifier = i18n._language('views.vehicles.columns.indentifier');
    const trademark = i18n._language('views.vehicles.columns.trademark');
    const gpsId = i18n._language('views.vehicles.columns.gpsId');
    const toggleModalSearch = () => setmodalSearch(!modalSearch);
    const showModal = () => {
        setAdd({});
        toggleModalSearch();
    };
    const handleAdd = () => {
        vehiclesDB.addVehicle(add.tagName, add.identifier, add.trademark, add.cab || null);
        toggleModalSearch();
    };
    const handleChange = (e) => {
        setAdd({...add, [e.target.name]: e.target.value});
    };
    const handleEdit = (vehicle = {}) => {
        setAdd({...vehicle});
        toggleModalSearch();
    };
    const handleDelete = (id) => {
        vehiclesDB.deleteVehicle(id);
        setAdd({});
    };
    vehiclesDB.updateVehicles();
    const connect = async () => {
        const PRINT_SERVICE_CODE = '000018f0-0000-1000-8000-00805f9b34fb';
        const sendTextData = (characteristic) => {
            const encoder = new TextEncoder('UTF-8');
            const text = encoder.encode('TESTETSETS\u000A\u000D');
            return characteristic.writeValue(text).then(() => console.log('Write done'));
        };
        const isAvailable = await navigator.bluetooth.getAvailability();
        if (isAvailable) {
            try {
                // navigator.bluetooth.requestDevice({filters:[{services:['battery_service']}]})
                navigator.bluetooth.requestDevice({acceptAllDevices: true})
                    .then(device => {
                        console.log(device);
                        return device.gatt.connect();
                    })
                    .then(server => {
                        return server.getPrimaryService(PRINT_SERVICE_CODE);
                    })
                    .then(service => {
                        return service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb');
                    })
                    .then((characteristic) => {
                        sendTextData(characteristic);
                    })
                    .catch(err => console.error(err));


            } catch (e) {
                console.log(e);
            }
        } else {
            const options = {
                place: "tl",
                message: (
                    <div>
                        <div>
                            No se encontro un dispositivo bluetooth
                        </div>
                    </div>
                ),
                type: "danger",
                icon: "tim-icons icon-alert-circle-exc",
                autoDismiss: 3,
            };
            notificationAlertRef.current.notificationAlert(options)
        }

    };


    const notificationAlertRef = React.useRef(null);
    const synchro = ()=>{
        vehiclesDB.synchronizeDB().then((res) => {
            console.log( res);
            let options = {};
            options = {
                place: "tl",
                message: (
                    <div>
                        <div>
                            Up: {`${res}`}
                        </div>
                    </div>
                ),
                type: "info",
                icon: "tim-icons icon-bell-55",
                autoDismiss: 3,
            };
            notificationAlertRef.current.notificationAlert(options)
        })
            .catch((res) => {
                console.log(res);
                let options = {};
                options = {
                    place: "tl",
                    message: (
                        <div>
                            <div>
                                Up: {`${res}`}
                            </div>
                        </div>
                    ),
                    type: "info",
                    icon: "tim-icons icon-bell-55",
                    autoDismiss: 3,
                };
                notificationAlertRef.current.notificationAlert(options)
            });
    };


    return (
        <>
            <div className="content">
                <div className="react-notification-alert-container">
                    <NotificationAlert ref={notificationAlertRef}/>
                </div>
                <Row>
                    <Col md="12">
                        <Card className="card-plain">
                            <CardHeader>
                                <CardTitle tag="h4">
                                    <Row>
                                        <Col xs="6" sm="6" md="8" xl="8" lg="8">
                                            {i18n._language('views.vehicles.tableTitle')}
                                            <p className="category">{i18n._language('views.vehicles.tableSubTitle', {
                                                date: new Date().getUTCDate() + '/' +
                                                    (new Date().getMonth() + 1) + '/' + new Date().getFullYear()
                                            })}</p>
                                        </Col>
                                        <Col xs="6" sm="6" md="4" xl="4" lg="4">
                                            <Button id="tooltipadd" onClick={() => showModal()} color="info"
                                                    className="btn-icon btn-round mr-5 float-right">
                                                <i className="tim-icons icon-bus-front-12"/>
                                            </Button>
                                            <Button id="tooltipsynchro" onClick={()=>synchro()} color="info"
                                                    className="btn-icon btn-round mr-1 float-right">
                                                <i className="tim-icons icon-refresh-02"/>
                                            </Button>
                                            <Button
                                                id="tooltipbluetooth"
                                                color="danger"
                                                className="btn-icon btn-round float-right"
                                                onClick={() => connect()}>
                                                <i className="tim-icons icon-wifi"/>
                                            </Button>
                                        </Col>
                                    </Row>

                                </CardTitle>


                            </CardHeader>
                            <CardBody>
                                <Table className="tablesorter" responsive>
                                    <thead className="text-primary">
                                    <tr>
                                        <th>{i18n._language('views.vehicles.columns.tagName')}</th>
                                        <th>{i18n._language('views.vehicles.columns.indentifier')}</th>
                                        <th>{i18n._language('views.vehicles.columns.trademark')}</th>
                                        <th className="text-center">{i18n._language('views.vehicles.columns.gpsId')}</th>
                                        <th className="text-center">{i18n._language('views.vehicles.columns.action')}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {sessionStorage.getItem('search') ? vehiclesDB.search(sessionStorage.getItem('search')).map((vehicle, key) => (
                                        <tr key={key + vehicle.tagName + vehicle.identifier + vehicle.cab}>
                                            <td><a id="tooltipedit" href="#Edit"
                                                   onClick={() => handleEdit({...vehicle})}>{vehicle.tagName}</a></td>
                                            <td>{vehicle.identifier}</td>
                                            <td>{vehicle.trademark}</td>
                                            <td className="text-center">
                                                {vehicle.cab ?
                                                    <a href="#connect"
                                                       id="tooltipconnect"
                                                       onClick={() => connect(vehicle.cab)}>{vehicle.cab} </a> :
                                                    <p style={{color: "red"}}>{i18n._language('views.vehicles.columns.null')}</p>}
                                            </td>
                                            <td className="text-center">
                                                {vehicle.cab ? null :
                                                    <Button
                                                        color="link"
                                                        title=""
                                                        type="button"
                                                        id="tooltipdelete"
                                                        className="btn-icon btn-round"
                                                        onClick={() => handleDelete(vehicle.id)}>
                                                        <i className="tim-icons icon-trash-simple text-danger"/>
                                                    </Button>}
                                            </td>

                                        </tr>
                                    )) : vehiclesDB.getAll().map((vehicle, key) => (
                                        <tr key={key + vehicle.tagName + vehicle.identifier + vehicle.cab}>
                                            <td><a id="tooltipedit" href="#Edit"
                                                   onClick={() => handleEdit({...vehicle})}>{vehicle.tagName}</a></td>
                                            <td>{vehicle.identifier}</td>
                                            <td>{vehicle.trademark}</td>
                                            <td className="text-center">{vehicle.cab ? <a href="#connect"
                                                                                          id="tooltipconnect"
                                                                                          onClick={() => connect(vehicle.cab)}>{vehicle.cab} </a> :
                                                <p style={{color: "red"}}>{i18n._language('views.vehicles.columns.null')}</p>}</td>
                                            <td className="text-center">
                                                {vehicle.cab ? null :
                                                    <Button
                                                        color="link"
                                                        title=""
                                                        type="button"
                                                        id="tooltipdelete"
                                                        className="btn-icon btn-round"
                                                        onClick={() => handleDelete(vehicle.id)}>
                                                        <i className="tim-icons icon-trash-simple text-danger"/>
                                                    </Button>}
                                                <UncontrolledTooltip
                                                    delay={10}
                                                    target="tooltipdelete"
                                                    placement="left"
                                                >
                                                    {i18n._language('views.vehicles.columns.delete')}
                                                </UncontrolledTooltip>
                                                <UncontrolledTooltip
                                                    delay={10}
                                                    target="tooltipedit"
                                                    placement="left"
                                                >
                                                    {i18n._language('views.vehicles.columns.edit')}
                                                </UncontrolledTooltip>
                                                <UncontrolledTooltip
                                                    delay={10}
                                                    target="tooltipadd"
                                                    placement="left"
                                                >
                                                    {i18n._language('views.vehicles.columns.add')}
                                                </UncontrolledTooltip>
                                                <UncontrolledTooltip
                                                    delay={10}
                                                    target="tooltipbluetooth"
                                                    placement="left"
                                                >
                                                    {i18n._language('views.vehicles.columns.bluetooth')}
                                                </UncontrolledTooltip>
                                                <UncontrolledTooltip
                                                    delay={10}
                                                    target="tooltipconnect"
                                                    placement="left"
                                                >
                                                    {i18n._language('views.vehicles.columns.connect')}
                                                </UncontrolledTooltip>
                                                <UncontrolledTooltip
                                                    delay={10}
                                                    target="tooltipsynchro"
                                                    placement="left"
                                                >
                                                    {i18n._language('views.vehicles.columns.synchro')}
                                                </UncontrolledTooltip>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                    <Modal
                        modalClassName="modal-search"
                        isOpen={modalSearch}
                        toggle={toggleModalSearch}
                        // onClosed={() => handleClose()}
                    >
                        <Row>
                            <Col md={12} className="mr-auto">
                                <Button
                                    color="danger"
                                    className="btn-icon btn-round float-right"
                                    onClick={toggleModalSearch}
                                >
                                    <i className="tim-icons icon-simple-remove"/>
                                </Button>
                                <Button
                                    className="btn-icon btn-round mr-auto float-right"
                                    onClick={handleAdd}
                                >
                                    <i className="tim-icons icon-cloud-upload-94"/>
                                </Button>
                            </Col>
                        </Row>
                        <Row lg="12" className="float-left">
                            <ModalHeader>
                                <Row noGutters={true} form={true} className="form-inline">
                                    <Col md={2}>
                                        <i className="tim-icons icon-bus-front-12 float-right"/>
                                    </Col>
                                    <Col md={10}>
                                        <input defaultValue={add.tagName} name="tagName"
                                               onChange={(e) => handleChange(e)} className="form-control"
                                               placeholder={tagName} type="text"/>
                                    </Col>
                                </Row>
                                <Row noGutters={true} form={true} className="form-inline">
                                    <Col md={2}>
                                        <i className="tim-icons icon-delivery-fast float-right"/>
                                    </Col>
                                    <Col md={10}>
                                        <input defaultValue={add.identifier} name="identifier"
                                               onChange={(e) => handleChange(e)} className="form-control"
                                               placeholder={identifier} type="text"/>
                                    </Col>
                                </Row>
                                <Row noGutters={true} form={true} className="form-inline">
                                    <Col md={2}>
                                        <i className="tim-icons icon-tag float-right"/>
                                    </Col>
                                    <Col md={10}>
                                        <input defaultValue={add.trademark} name="trademark"
                                               onChange={(e) => handleChange(e)} className="form-control"
                                               placeholder={trademark} type="text"/>
                                    </Col>
                                </Row>
                                <Row noGutters={true} form={true} className="form-inline">
                                    <Col md={2}>
                                        <i className="tim-icons icon-square-pin float-right"/>
                                    </Col>
                                    <Col md={10}>
                                        <input defaultValue={add.cab} name="cab" onChange={(e) => handleChange(e)}
                                               className="form-control" placeholder={gpsId} type="text"/>
                                    </Col>
                                </Row>
                            </ModalHeader>
                        </Row>

                    </Modal>
                </Row>

            </div>

        </>
    );
}

export default Tables;
