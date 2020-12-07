<script>
export default {
    data() {
        return {
            sbSending: false,
            mixinErrors: []
        }
    },
    methods: {
        then(response) {
            if (response.data.message) {
                this.toast(response.data.message, { variant: "success" })
            } else {
                this.toast("saved!", { variant: "success" })
            }
        },
        catch(error, useCustomErrorsPosition) {
            this.mixinErrors = error.response.data.errors || []
            console.log(this.mixinErrors)
            if (this.isset(() => error.response.data.errors.custom_errors)) {
                if (!useCustomErrorsPosition) {
                    error.response.data.errors.custom_errors.forEach((error, index, array) => {
                        this.toast(error, { variant: "danger" })
                    })
                }
            }
        },
        request(
            method,
            url,
            data = {},
            {
                useCustomErrorsPosition = false,
                onStart = () => ({}),
                onFinish = () => ({}),
                onSuccess = () => ({})
            } = {}
        ) {
            onStart()
            this.mixinErrors = {}
            this.sbSending = true

            if (method === "post") {
                axios
                    .post(url, data)
                    .then((response) => {
                        this.then(response)
                        this.form = {}
                        onSuccess()
                    })
                    .catch((error) => {
                        this.catch(error, useCustomErrorsPosition)
                    })
                    .finally(() => {
                        this.sbSending = false
                        onFinish()
                    })
            } else if (method === "put") {
                axios
                    .put(url, data)
                    .then((response) => {
                        this.then(response)
                        onSuccess()
                    })
                    .catch((error) => {
                        this.catch(error, useCustomErrorsPosition)
                    })
                    .finally(() => {
                        this.sbSending = false
                        onFinish()
                    })
            }
        },
        isset(accessor) {
            // usage  this.isset(() => some.nested.deeper.value) // false
            try {
                return typeof accessor() !== "undefined"
            } catch (e) {
                return false
            }
        },
        toast(message, options = {}) {
            this.$root.$bvToast.toast(message, options)
        }
    }
}
</script>