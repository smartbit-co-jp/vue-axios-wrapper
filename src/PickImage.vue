<template>
    <div class="w-100">
        <a href="#.">
            <div @click="showModal = true">
                <img width="180" v-if="path" :src="path" />
            </div>
        </a>
        <input type="file" class="d-none" ref="file" v-on:change="handleFileUpload()" />

        <div class="mt-2">
            <button type="button" class="btn btn-primary" @click="$refs.file.click()">
                <span style="line-height: 20px;">{{ buttonText }}</span>
            </button>
        </div>
        <b-modal size="lg" centered no-fade v-model="showModal" hide-header hide-footer>
            <img class="w-100" v-if="path" :src="path" />
        </b-modal>
    </div>
</template>

<script>
export default {
    props: {
        path:null,
        buttonText:{
            type:String,
            default:'pick a image'
        }
    },
    data: function() {
        return {
            showModal:false,
            file:"",
        };
    },
    methods: {
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
            this.$emit('input', this.file)
            this.$emit('update:path', URL.createObjectURL(this.file))
        },
    }
};
</script>