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
        //debug_log("RES IS", res.data.data)
        return res
    },
    buildFormEx(mtype, obj) {

        function doProp(key, prop) {
            //debug_log("PROP", prop)
            var formprop = {
                'name': key,
                'datatype': prop.datatype,
                'label': prop.label,
                'help': prop.help,
                'sources': 'sources' in prop ? prop.sources : null,
            }

            if ('properties' in prop) {
                // has sub properties, for link fields
                formprop.config = {
                    fields: []
                }

                for (var subkey in prop.properties) {
                    var subprop = doProp(subkey, prop.properties[subkey])
                    formprop.config.fields.push(subprop)
                }
            }
            return formprop
        }

        var mt = this.get(mtype)
        if (mt == null) return null;
        var res = {
            config: {
                fields: [],
                values: {}
            }
        }
        var fv
        for (var key in mt.properties) {
            fv = obj.properties[key]
            res.config.values[key] = fv
            var formprop = doProp(key, mt.properties[key])
            res.config.fields.push(formprop)
        }

        // treat modules like fields, with datatype = module
        //debug_log("OBJ", obj.properties)
        for (var modkey in mt.modules) {
            //debug_log("MOD", key, mt.modules[modkey].properties)
            var formprop = doProp(modkey, mt.modules[modkey])
            formprop.valuekey = "module." + modkey
            fv = obj.properties[formprop.valuekey]

            // enforce array types for values
            if (fv === undefined) {
                fv = []
            } else
            if (typeof fv == 'object') {
                if (!Array.isArray(fv)) {
                    fv = [fv]
                }
            }
            res.config.values[formprop.valuekey] = fv
            res.config.fields.push(formprop)
        }

        return res;
    },

}

export default GlobalMTypes;