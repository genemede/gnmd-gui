const DialogsService = {
    dialogs: [],
    appref: null,
    //
    setApp(app) {
        app.test()
        this.appref = app
        //debug_log('app', this.appref)
    },
    dlgCancelEvent() {
        //this.appref.dlgCancelEvent();
        this.appref.intCancelDlg();
    },
    test() {
        console.log('dialog service ok')
    },
    intFindDialog(dlgName) {
        let dlg = this.dialogs.find(el => el.name == dlgName);
        if (dlg) return dlg;
        return null;
    },
    // shorthand functions for common dialogs
    confirm(dlgTitle, dlgText, dlgOptions = null) {
        var opts = {
            title: dlgTitle,
            text: dlgText,
            okText: 'Ok',
            cancelText: 'Cancel',
            type: 'confirm'
        };
        //debug_log('confirm', opts, dlgOptions);
        if (dlgOptions != null) opts = { ...opts, ...dlgOptions };
        return this.showDialog('ConfirmDialog', null, opts);
    },
    inform(dlgTitle, dlgText, dlgOptions = null) {
        var opts = {
            title: dlgTitle,
            text: dlgText,
            okText: 'Ok',
            type: 'inform'
        };
        if (dlgOptions != null) opts = { ...opts, ...dlgOptions };
        return this.showDialog('InformDialog', null, opts);
    },
    alert(dlgTitle, dlgText, dlgOptions = null) {
        var opts = {
            title: dlgTitle,
            text: dlgText,
            okText: 'Ok',
            type: 'alert'
        };
        if (dlgOptions != null) opts = { ...opts, ...dlgOptions };
        return this.showDialog('InformDialog', null, opts);
    },
    error(dlgTitle, dlgText, dlgOptions = null) {
        // exactly the same as alert; exists to leave space for extension
        return this.alert(dlgTitle, dlgText, dlgOptions);
    },
    share(type, item, element) {
        // not sure if gnmd will use this; maybe on the hub
        return this.showDialog('SocialShare', { type: type, item: item, el: element }, { simple: true, containerClasses: 'bgsoft' });
    },
    // dialog helper functions
    setTitle(title) {
        // sets title for currently active dialog
        store.state.appref.dlgOptions.title = title;
    },
    registerDialog(dlgName, dlgArguments, dlgOptions) {
        let dlg = {
            name: dlgName,
            arguments: dlgArguments,
            options: dlgOptions
        };
        this.dialogs.push(dlg);
    },

    // main function for showing dialogs
    showDialog(dlgName, dlgData, dlgOptions = null) {
        // testing if we can keep dlgData observed by vue
        //debug_log('showdialog', dlgName)
        let dlg = this.intFindDialog(dlgName);
        let data;
        let opts = dlg ? dlg.options : {};

        // both methods maintain vue observers
        if (Array.isArray(dlgData)) {
            // arguments passed in array; dialog must be registered for this to work

            //console.log('SHOW DIALOG AA', dlg.arguments.length, dlgData.length);
            if (dlg && dlg.arguments.length == dlgData.length) {
                data = {};
                for (let i = 0; i < dlgData.length; i += 1) {
                    //console.log('SHOW DIALOG bb', dlg.arguments[i], i);
                    data[dlg.arguments[i]] = dlgData[i];
                }
            } else {
                console.error('Unregistered Dialog Call', dlgName);
            }
        } else {
            // arguments passed in object
            data = dlgData;
        }

        if (dlgOptions != null) opts = { ...opts, ...dlgOptions };
        if (this.appref) {
            //return store.state.appref.intDlgShow(dlgName, data, opts);
            return this.appref.intDlgShow(dlgName, data, opts);
        }
    }
};

export default DialogsService;
