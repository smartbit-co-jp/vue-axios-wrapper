<template>
    <b-button :variant="variant" @click="$emit('click')" :disabled="loading" style="position: relative">
        <span :style="{ opacity: loading ? '0' : 1 }"> <slot>save</slot> </span>
        <div v-if="loading" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%">
            <b-spinner class="mt-2" small label="Small Spinner"></b-spinner>
        </div>
    </b-button>
</template>

<script>
export default {
    props: {
        loading: Boolean,
        variant: {
            type: String,
            default: "success"
        }
    }
}
</script>