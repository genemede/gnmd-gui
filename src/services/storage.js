const AppStorage = {
    getVal(propName, defValue) {
        var res = localStorage.getItem(propName);
        //console.log('stggetval', propName, res);
        if (res == null || res == '' && defValue != null) {
            //console.log('using def value', defValue);
            res = defValue;
        }
        return res;
    },

    setVal(propName, value) {
        localStorage.setItem(propName, value);
    },

    deleteVal(propName) {
        localStorage.removeItem(propName);
    },

    getInt(propName, defValue) {
        return parseInt(this.getVal(propName, defValue));
    },

    setBool(propName, value) {
        this.setVal(propName, value == true ? 1 : 0);
    },
    getBool(propName, defValue = false) {
        let tmp = this.getVal(propName, defValue);
        if (tmp === 1 || tmp === '1' || tmp === 'true' || tmp === true) return true;
        return false;
    },
    setObject(propName, obj) {
        this.setVal(propName, JSON.stringify(obj));
    },
    getObject(propName, defValue = null) {
        let tmp = this.getVal(propName, defValue);
        if (tmp != null) {
            return JSON.parse(tmp);
        }
        return null;
    }
}

export default AppStorage;
