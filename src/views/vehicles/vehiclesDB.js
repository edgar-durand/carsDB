import React from 'react';
import NotificationAlert from "react-notification-alert";

const Notification = ({place, message, type}) => {
    const notificationAlertRef = React.useRef(null);
    let options = {};
    options = {
        place,
        message: (
            <div>
                <div>
                   {`${message}`}
                </div>
            </div>
        ),
        type,
        icon: "tim-icons icon-bell-55",
        autoDismiss: 3,
    };
    notificationAlertRef.current.notificationAlert(options)
    return (
        <div className="react-notification-alert-container">
            <NotificationAlert ref={notificationAlertRef}/>
        </div>
    )
};

let vehiclesDB = [{
    id: 1,
    tagName: "B170940",
    identifier: "11-113",
    trademark: "YUTONG",
    cab: "F9187",
    modified: false
}];
/**
 *
 * @returns {*[]}
 */
// eslint-disable-next-line no-extend-native
Array.prototype.getAll = () => vehiclesDB.map(vehicle => typeof (vehicle) === 'object' ? vehicle : null);
/**
 *
 * @param {string} tagName
 * @param {string} identifier
 * @param {string} trademark
 * @param {any} cab
 */
// eslint-disable-next-line no-extend-native
Array.prototype.addVehicle = function (tagName, identifier, trademark, cab = null, modified = true) {
    const EXIST = vehiclesDB.find(vehicle => vehicle.tagName === tagName);
    if (EXIST) {
        //    Solo actualizar los datos que sean diferentes si existe
        EXIST.identifier = identifier || EXIST.identifier;
        EXIST.trademark = trademark || EXIST.trademark;
        EXIST.cab = cab || null;
        if (EXIST.identifier !== identifier || EXIST.trademark !== trademark || EXIST.cab !== cab) EXIST.modified = true;
    } else {
        vehiclesDB.push({
            id: vehiclesDB.getAll().length,
            tagName,
            identifier,
            trademark,
            cab,
            modified
        });
    }
    vehiclesDB.save();
};
// eslint-disable-next-line no-extend-native
Array.prototype.deleteVehicle = function (id) {
    if (id) {
        if (vehiclesDB.find(vehicle => vehicle.id === id)) {
            vehiclesDB = vehiclesDB.filter(vehicle => vehicle.id !== id);
            vehiclesDB.save();
        }
    }
};
// eslint-disable-next-line no-extend-native
Array.prototype.updateVehicles = function () {
    if (localStorage.getItem('vehicles')) {
        vehiclesDB = [];
        JSON.parse(localStorage.getItem('vehicles')).map(vehicle => vehiclesDB.addVehicle(vehicle.tagName, vehicle.identifier, vehicle.trademark, vehicle.cab, vehicle.modified));
    }
};
// eslint-disable-next-line no-extend-native
Array.prototype.synchronizeDB = async function () {
    const SERVER = 'http://localhost:8000/', APP_KEY = '1234';
    const toUpload = vehiclesDB.getAll().slice().filter(vehicle => vehicle.modified === true);
    const CONFIG = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'APP_KEY': APP_KEY,
        },
        body: JSON.stringify(toUpload)
    };
    let result = {up: {}, down: {}};
    const SYNCHRONIZE_UP = async () => (await fetch(`${SERVER}api/vehicles`, CONFIG)).json();
    SYNCHRONIZE_UP()
        .then(() => {
            result['up'] = "Synchronized!";
            // const SYNCHRONIZE_DOWN = async () => await ((await fetch(`${SERVER}api/vehicles`)).json());
            // SYNCHRONIZE_DOWN().then(res => {
            //     if (res.hasOwnProperty('data')) {
            //         res.data.forEach(vehicle => vehiclesDB.addVehicle(vehicle.tagName, vehicle.identifier, vehicle.trademark, vehicle.cab, false));
            //         result['down'] = "Synchronized!";
            //     } else
            //         throw new Error();
            // })
            //     .catch((e) => result['down'] = (e));
        })
        .catch((e) => {

            result.up = e
        });
};
// eslint-disable-next-line no-extend-native
Array.prototype.save = function () {
    localStorage.setItem('vehicles', JSON.stringify(vehiclesDB.getAll()))
};
// eslint-disable-next-line no-extend-native
Array.prototype.setCab = function (id, newCab) {
    vehiclesDB.find(vehicle => vehicle.id === id).cab = newCab;
    vehiclesDB.find(vehicle => vehicle.id === id).modified = true;
    vehiclesDB.save();
};
// eslint-disable-next-line no-extend-native
Array.prototype.unmountCab = function (id) {
    vehiclesDB.find(vehicle => vehicle.id === id).cab = null
};
// eslint-disable-next-line no-extend-native
Array.prototype.getVehicle = function (id) {
    return vehiclesDB.find(vehicle => vehicle.id === id);
};
// eslint-disable-next-line no-extend-native
Array.prototype.search = function (search) {
    return vehiclesDB.filter(vehicle => vehicle.tagName.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        vehicle.identifier.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        vehicle.trademark.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        vehicle.cab?.toLowerCase().indexOf(search.toLowerCase()) > -1)
};

export default vehiclesDB;