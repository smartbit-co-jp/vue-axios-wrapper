<template>
    <b-modal header-bg-variant="danger" header-text-variant="white" :title="title" ok-only ok-variant="secondary" centered no-fade id="modalError">
        <div v-if="$root.sbErrors && $root.sbErrors.exceptions && $root.sbErrors.exceptions.length">
            <div v-for="(error , index) in $root.sbErrors.exceptions" :key="index">
                {{ error }}
            </div>
        </div>
    </b-modal>
</template>

<script>
export default {
    mounted() {
        if(this.sbIsset(() => this.$root.sbAxiosWrapper.toast.title)){
            this.title = this.$root.sbAxiosWrapper.toast.title
        }
    },
    data: function() {
        return {
           title:'Error'
        };
    },
};
</script>