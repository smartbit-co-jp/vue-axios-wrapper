<template>
    <div class="w-100">
        <a href="#.">
            <div @click="showModal = true">
                <img width="180" v-if="src" :src="src" />
            </div>
        </a>
        <input type="file" :name="name" class="d-none" ref="file" v-on:change="handleFileUpload()" />

        <div class="mt-2">
            <button type="button" class="btn btn-primary" @click="$refs.file.click()">
                <span style="line-height: 20px;">{{ buttonText }}</span>
            </button>
        </div>
        <b-modal size="lg" centered no-fade v-model="showModal" hide-header hide-footer>
            <img class="w-100" v-if="path" :src="src" />
        </b-modal>
    </div>
</template>

<script>
export default {
    props: {
        pathPrepend:null,
        name:String,
        initialPath:null,
        buttonText:{
            type:String,
            default:'pick a image'
        }
    },
    data: function() {
        return {
            showModal:false,
            file:"",
            path:""
        };
    },
    computed:{
        src: function(){
            if(!this.path){
                return null
            }
            if(this.path.includes('blob')){
                return this.path
            }
            if(this.pathPrepend){
                return this.pathPrepend + this.path
            }
            return this.path
        }
    },
    mounted() {
        this.path = this.initialPath
    },
    methods: {
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
            this.$emit('input', this.file)
            this.path = URL.createObjectURL(this.file)
        },
    }
};
</script>