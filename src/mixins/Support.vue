<script>
export default {
    data() {
        return {
            sbSending: false,
            sbErrors: []
        }
    },
    methods: {
        then(response, shouldDisplayToast, showOnlyErrorMessages,  successMessageTimeOut) {
            if (response.message && shouldDisplayToast && !showOnlyErrorMessages) {
                this.sbToast(response.message, { variant: "success",  autoHideDelay:successMessageTimeOut })
            } else {
                if(shouldDisplayToast && !showOnlyErrorMessages){
                    this.sbToast("", { variant: "success" , autoHideDelay:successMessageTimeOut})
                }
            }
        },
        catch(error, shouldDisplayToast, showErrorsInModal) {

            var errors = []
            if (this.sbIsset(() => error.response.data.errors)) {
                // set validation errors
                errors = error.response.data.errors
            } else if (this.sbIsset(() => error.response.data.exceptions)) {
                // set exceptions defined in controller
                errors = error.response.data
            } else if (this.sbIsset(() => error.response.data.exception)) {
                // set server exception
                errors = {}
                var errorMessage = this.sbIsset(() => this.$root.sbAxiosWrapper.defaultServerErrorMessage)
                    ? this.$root.sbAxiosWrapper.defaultServerErrorMessage
                    : "server error."
                errors.exceptions = [errorMessage]
            }
            this.$root.sbErrors = errors
            this.sbErrors = errors

            // check if exceptions exists
            var exceptionsExists =
                this.sbIsset(() => this.sbErrors.exceptions) || this.sbIsset(() => this.sbErrors.exception)

            // show exceptions in modal
            if (showErrorsInModal && exceptionsExists) {
                this.$root.$emit("bv::show::modal", "modalError")
            }

            // show exceptions in toast
            if (shouldDisplayToast && exceptionsExists) {
                this.sbErrors.exceptions.forEach((error) => {
                    this.sbToast(error, { variant: "danger" })
                })
            }
        },
        request(
            method,
            url,
            data = {},
            {
                showErrorsInModal = false,
                resetForm = null,
                shouldDisplayToast = true,
                showOnlyErrorMessages = false,
                successMessageTimeOut = 5000,
                onStart = () => ({}),
                onFinish = () => ({}),
                onSuccess = () => ({}),
                onError = () => ({})
            } = {}
        ) {
            onStart()
            this.$root.sbErrors = []
            this.sbErrors = []
            this.sbSending = true

            if (method === "post") {
                axios
                    .post(url, data)
                    .then((response) => {
                        this.then(response.data, shouldDisplayToast, showOnlyErrorMessages, successMessageTimeOut)
                        if (resetForm !== false) {
                            this.form = {}
                        }
                        onSuccess(response.data)
                    })
                    .catch((error) => {
                        this.catch(error, shouldDisplayToast, showErrorsInModal)
                        onError(error.response.data)
                    })
                    .finally(() => {
                        this.sbSending = false
                        onFinish()
                    })
            } else if (method === "put") {
                axios
                    .put(url, data)
                    .then((response) => {
                        this.then(response.data, shouldDisplayToast, showOnlyErrorMessages, successMessageTimeOut)
                        if (resetForm === true) {
                            this.form = {}
                        }
                        onSuccess(response.data)
                    })
                    .catch((error) => {
                        this.catch(error, shouldDisplayToast, showErrorsInModal)
                        onError(error.response.data)
                    })
                    .finally(() => {
                        this.sbSending = false
                        onFinish()
                    })
            }
        },
        sbToast(message, options = {}) {
            options.title = this.sbIsset(() => this.$root.sbAxiosWrapper.toast.title)
                ? this.$root.sbAxiosWrapper.toast.title
                : "info"
            message =
                message ||
                (this.sbIsset(() => this.$root.sbAxiosWrapper.toast.defaultMessage)
                    ? this.$root.sbAxiosWrapper.toast.defaultMessage
                    : "saved.")
            if (options.variant == null) {
                options.variant = "info"
            }
            this.$root.$bvToast.toast(message, options)
        },
        sbIsset(accessor) {
            try {
                return typeof accessor() !== "undefined"
            } catch (e) {
                return false
            }
        }
    }
}
</script>
