<template v-once>
    <div class="input-wrapper inline">
        <label class="label">Label</label>
        <div class="control full">
            <input name='basic' value='tag1, tag2 autofocus'>
        </div>
        <div style='flex-basis: 100%; height: 0'></div>
    </div>
</template>

<script>
import Tagify from '@yaireo/tagify';
//import "./tagify.css"

export default {
    name: "GTags",
    props: {
      mode: String,
      settings: Object,
      value: [String, Array],
      onChange: Function
    },
    watch: {
      value(newVal, oldVal) {
        this.tagify.loadOriginalValues(newVal)
      },
    },
    mounted() {
        this.tagify = new Tagify(this.$el, this.settings)
    }
  };
  </script>