const i18n = {
    _language(path = '', param = {}) {
        let lang = sessionStorage.getItem('locale') ?
            JSON.parse(sessionStorage.getItem(sessionStorage.getItem('locale'))) :
            this[this.default];
        path && path.split('.').forEach(current => lang = lang[current] ? lang[current] : lang);

        if (param)
            for (let key in param) lang = lang.includes(`{${key}}`) ? lang.replace(`{${key}}`, param[key]) : lang;


        return lang
    },
    default: i18n[navigator.language] ? navigator.language : "es-ES",
    'es-ES': {
        'header': {
            "title": {
                "dashboard": "Panel Principal",
                "notifications": "Notificaciones",
                "user-profile": "Editar Perfil",
                "tables": "Listado de vehiculos"
            },
            "search": "Buscar",
            "account": "Usuario {name}",
            "dropDown": {
                "logOut": "Salir"
            }
        },
        "views": {
            "vehicles": {
                "tableTitle": "Listado de vehiculos",
                "tableSubTitle": "Ultima actualizacion: {date}",
                "columns": {
                    "id": "ID",
                    "tagName": "MATRICULA",
                    "indentifier": "INDICATIVO",
                    "trademark": "MARCA",
                    "gpsId": "ID GPS",
                    "null": "Ninguno",
                    "action": "Aciones",
                    "delete": "Eliminar",
                    "edit": "Editar",
                    "connect": "Conectar al bluetooth",
                    "synchro": "Sincronizar",
                    "add": "Agregar nuevo vehiculo",
                    "bluetooth": "Buscar dispositivos bluetooth"
                },

            }
        },
        "fixedPlugin": {},
        "footer": {
            "support": "Soporte tecnico",
            "made": "Hecho con",
            "by": "por",
            "forA": "para un trabajo confortable.",
            "text": "Saludos,%le%contacto%por%motivo%de"
        },

    },

};
export default i18n;