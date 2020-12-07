<script>
export default {
    data() {
        return {
            sbSending: false,
            sbErrors: []
        }
    },
    methods: {
        then(response) {
            if (response.data.message) {
                this.sbToast(response.data.message, { variant: "success" })
            } else {
                this.sbToast("saved!", { variant: "success" })
            }
        },
        catch(error, shouldDisplayToast) {
            this.sbErrors = error.response.data.errors || []
            if (this.isset(() => error.response.data.errors.custom_errors)) {
                if (shouldDisplayToast) {
                    error.response.data.errors.custom_errors.forEach((error, index, array) => {
                        this.sbToast(error, { variant: "danger" })
                    })
                }
            }
        },
        request(
            method,
            url,
            data = {},
            { shouldDisplayToast = true, onStart = () => ({}), onFinish = () => ({}), onSuccess = () => ({}) } = {}
        ) {
            onStart()
            this.sbErrors = {}
            this.sbSending = true
            this.$root.errors = []

            if (method === "post") {
                axios
                    .post(url, data)
                    .then((response) => {
                        this.then(response)
                        this.form = {}
                        onSuccess()
                    })
                    .catch((error) => {
                        this.catch(error, shouldDisplayToast)
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
                        this.catch(error, shouldDisplayToast)
                    })
                    .finally(() => {
                        this.sbSending = false
                        onFinish()
                    })
            }
            function toast(message, options = {}) {
                if (this.$root.sbAxiosWrapper == null) {
                    options.title = "info"
                }
                if (options.variant == null) {
                    options.variant = "info"
                }
                this.$root.$bvToast.toast(message, options)
            }
        },
        sbToast(message, options = {}) {
            options.title = this.isset(() => this.$root.sbAxiosWrapper.toast.title)
                ? this.$root.sbAxiosWrapper.toast.title
                : "info"
            message = this.isset(() => this.$root.sbAxiosWrapper.toast.defaultMessage)
                ? this.$root.sbAxiosWrapper.toast.defaultMessage
                : message
            if (options.variant == null) {
                options.variant = "info"
            }
            this.$root.$bvToast.toast(message, options)
        }
    }
}
</script>