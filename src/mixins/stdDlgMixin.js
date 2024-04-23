export default {
    methods: {
        dlgClickOk(value = true) {
            //this.$parent.$emit('dlgok', value);
            //this.$dlg.dlgCancelEvent();
            this.$dlg.appref.intOkDlg();
        },
        dlgClickCancel(value = true) {
            //this.$parent.$emit('dlgcancel', value);
            //this.$dlg.dlgCancelEvent();
            this.$dlg.appref.intCancelDlg();
        },
    },
    mounted() {
        debug_log('DIALOG MOUNTED', this.dlgdata, this.dlgoptions);
    },
    computed: {
        getBtnClasses() {
            if (this.getDlgType == 'alert' || this.getDlgType == 'error')  {
                return 'btn-danger';
            }
            else {
                return 'btn-success';
            }
        },
        getDlgType() {
            if (this.dlgoptions != null) return this.dlgoptions.type;
            return 'inform';
        },
        getDlgText() {
            if (this.dlgoptions != null) return this.dlgoptions.text;
            return '';
        },
        getOkText() {
            let s = 'Ok';
            if (this.dlgoptions != null && this.dlgoptions.okText) s = this.dlgoptions.okText;
            return s;
        },
        getCancelText() {
            let s = 'Cancel';
            if (this.dlgoptions != null && this.dlgoptions.cancelText) s = this.dlgoptions.cancelText;
            return s;
        },
        getConfirmSwapColors() {
            if (this.dlgoptions != null) return this.dlgoptions.confirmSwapColors;
            return false;
        }
    }
};
