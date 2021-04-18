let vehiclesDB = [{
    id: 1,
    tagName: "B170940",
    identifier: "11-113",
    trademark: "YUTONG",
    cab: "F9187"
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
Array.prototype.addVehicle = function (tagName, identifier, trademark, cab = null) {
    const EXIST = vehiclesDB.find(vehicle => vehicle.tagName === tagName || vehicle.identifier === identifier);
    if (!EXIST) {
        vehiclesDB.push({
            id: vehiclesDB.getAll().length,
            tagName,
            identifier,
            trademark,
            cab
        });
        vehiclesDB.save();
    }
};
// eslint-disable-next-line no-extend-native
Array.prototype.updateVehicles = function () {
    if (localStorage.getItem('vehicles')) {
        vehiclesDB = [];
        JSON.parse(localStorage.getItem('vehicles')).map(vehicle => vehiclesDB.addVehicle(vehicle.tagName, vehicle.identifier, vehicle.trademark, vehicle.cab));
    }
};
// eslint-disable-next-line no-extend-native
Array.prototype.synchronizeDB = async function () {
    const SERVER = 'http://localhost:8000/', APP_KEY = '1234';
    const SYNCHRONIZE_DOWN = async () => await ((await fetch(`${SERVER}api/vehicles`)).json());

    return SYNCHRONIZE_DOWN().then(response => {
        if (response.hasOwnProperty('data')) {
            response.data.forEach(vehicle => vehicle in vehiclesDB ? null : vehiclesDB.addVehicle(vehicle.tagName, vehicle.identifier, vehicle.trademark, vehicle.cab)) && vehiclesDB.save()
            const CONFIG = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'APP_KEY': APP_KEY,
                },
                body: JSON.stringify(vehiclesDB.getAll()),

            };

            const SYNCHRONIZE_UP = async () => await ((await fetch(`${SERVER}api/vehicles`, CONFIG)).json());
           return SYNCHRONIZE_UP()
               .then(()=>'SYNCHRONIZED.!')
                .catch(err => err);
        }else
          throw new Error();
    })
        .catch(err => err);

};
// eslint-disable-next-line no-extend-native
Array.prototype.save = function () {
    localStorage.setItem('vehicles', JSON.stringify(vehiclesDB.getAll()))
};
// eslint-disable-next-line no-extend-native
Array.prototype.setCab = function (id, newCab) {
    vehiclesDB.find(vehicle => vehicle.id === id).cab = newCab
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