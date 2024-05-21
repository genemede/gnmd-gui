import genemedeAPI from '@/services/gnmd-api.js';

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
    },
    listMtypes() {
        // simple list for user interfaces
        var res = []
        for (var key in this.data) {
            res.push({
                mtype: this.data[key].mtype,
                description: this.data[key].description
            });
        }
        return res;
    },
    async getSource(srcname) {
        var res = await genemedeAPI.apiGet("sources/" + srcname);
        //debug_log("SRC IS", res.data.data)
        return res
    }
}

export default GlobalMTypes;