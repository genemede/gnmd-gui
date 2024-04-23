const GlobalMTypes = {
    data: null,
    setData(jsondata) {
        this.data = jsondata
    },
    get(mt) {
        for (var key in this.data) {
            if (this.data[key].mtype == mt) {
                return this.data[key]
            }
        }
        return null;
    },
    getIcon(mt, addtext = null) {
        var obj = this.get(mt);
        //console.log("ICONGET", obj, mt)
        var res = "far fa-file-alt"
        if (obj && obj.fa_icon) {
            res = obj.fa_icon;
        }

        if (addtext) {
            res += " " + addtext;
        }
        return res;
    }
}

export default GlobalMTypes;