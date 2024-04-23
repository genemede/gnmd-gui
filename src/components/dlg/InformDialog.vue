<template>
    <div class="dlg-container">
        <div class="dlg-content">
            <p v-html="getDlgText"></p>
        </div>
        <div class="dlg-footer center">
            <GButton class="min-medium" :class='getBtnClasses' @click="dlgClickOk(true)">{{getOkText}}</GButton>
        </div>
    </div>
</template>

<script>
import StdDlgMixin from '@/mixins/stdDlgMixin.js';

export default {
    name: 'InformDialog',
    mixins: [StdDlgMixin],
    props: {
        dlgdata: Object,
        dlgoptions: Object
    },
}
</script>
