<template>
    <div class="dlg-container">
        <div class="dlg-content">
            <p v-html="getDlgText"></p>
        </div>
        <div class="dlg-footer right">
            <GButton
                class="min-medium"
                :class="{'btn-success': !getConfirmSwapColors, 'btn-danger': getConfirmSwapColors}"
                @click="dlgClickOk(true)">{{getOkText}}</GButton>

            <GButton
                class="min-medium"
                :class="{'btn-danger': !getConfirmSwapColors, 'btn-success': getConfirmSwapColors}"
                @click="dlgClickCancel(false)">{{getCancelText}}</GButton>
        </div>
    </div>
</template>

<script>
import StdDlgMixin from '@/mixins/stdDlgMixin.js';

export default {
    name: 'ConfirmDialog',
    mixins: [StdDlgMixin],
    props: {
        dlgdata: Object,
        dlgoptions: Object
    },
}
</script>
