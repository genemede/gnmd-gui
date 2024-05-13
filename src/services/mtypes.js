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
    async getSource(srcname) {
        var res = await genemedeAPI.apiGet("sources/" + srcname);
        //debug_log("RES IS", res.data.data)
        return res
    },
    setupForm(obj) {
        var fields = []
        var modules = []

        var mt = this.get(obj.mtype)
        var prop, formprop, v, modk

        function doProp(key, sourceprops, sourceobj, modprefix) {
            prop = sourceprops[key]
            formprop = {
                'name': key,
                'datatype': prop.datatype,
                'label': prop.label,
                'help': prop.help,
                'sources': 'sources' in prop ? prop.sources : null
            }
            if ('properties' in prop) {
                // has sub properties, for link fields
                formprop.properties = prop.properties
                formprop.config = {
                    fields: []
                }
                for (var subkey in prop.properties) {
                    var subprop = {
                        'name': subkey,
                        'datatype': prop.properties[subkey].datatype,
                        'label': prop.properties[subkey].label,
                        'help': prop.properties[subkey].help,
                        'sources': 'sources' in prop.properties[subkey] ? prop.properties[subkey].sources : null
                    }
                    //v = prop.properties[key]
                    //subprop.values = v
                    formprop.config.fields.push(subprop)
                }
            }
            /*
            if (modprefix !="") {
                //modk =
                debug_log("MODKEY", modprefix + "." + key)
                v = sourceobj.properties[modprefix + "." + key]
                debug_log("MODVAL", v)
            }
            else {
                v = sourceobj.properties[key]
            }
            */
            if (modprefix =="") {
                v = sourceobj.properties[key]
                formprop.values = v
            }

            return formprop
        }

        if (mt) {
            var mod
            for (var key in mt.properties) {
                formprop = doProp(key, mt.properties, obj, "")
                fields.push(formprop)
            }

            for (var modkey in mt.modules) {
                debug_log("MODKEY", modkey)
                mod = {
                    config: {
                        label: modkey,
                        fields: []
                    },
                    values: []
                }

                for (var key in mt.modules[modkey].properties) {
                    formprop = doProp(key, mt.modules[modkey].properties, obj, key)
                    mod.config.fields.push(formprop)
                }
                mod.values = obj.properties["module." + modkey]
                modules.push(mod)
            }
        }
        var res = {fields: fields, modules: modules}
        debug_log('- form config', res);
        return res;
    }
}

export default GlobalMTypes;