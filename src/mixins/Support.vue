<script>
import modal from "./modal"

export default {
    data() {
        return {
            sbSending: false,
            sbErrors: [],
            sbExceptions: [],
            sbServerError: []
        }
    },
    methods: {
        then(response) {
            if (response.message) {
                this.sbToast(response.message, { variant: "success" })
            } else {
                this.sbToast("", { variant: "success" })
            }
        },
        catch(error, shouldDisplayToast, showErrorsInModal) {
            this.$root.sbExceptions = []
            this.$root.sbServerError = ""
            this.sbErrors = this.sbIsset(() => error.response.data.errors) ? error.response.data.errors : []

            if (this.sbIsset(() => error.response.data.errors.exceptions)) {
                this.$root.sbErrors = error.response.data.errors.exceptions
            }
            if (this.sbIsset(() => error.response.data.exception)) {
                this.$root.sbServerError = this.$root.sbAxiosWrapper.defaultServerErrorMessage
                    ? this.$root.sbAxiosWrapper.defaultServerErrorMessage
                    : "server error."
            }
            if (this.sbIsset(() => error.response.data.errors.exceptions)) {
                this.$root.sbExceptions = error.response.data.errors.exceptions
            }

            if (showErrorsInModal && this.sbIsset(() => error.response.data.errors.exceptions)) {
                this.$root.$emit("bv::show::modal", "modalError")
            }

            // exibe erros do servidor
            if (this.sbIsset(() => this.$root.sbServerError) && this.$root.sbServerError.length) {
                if (showErrorsInModal) {
                    this.$root.$emit("bv::show::modal", "modalError")
                }
                if (shouldDisplayToast) {
                    this.sbToast(this.$root.sbServerError, { variant: "danger" })
                }
            }

            if (shouldDisplayToast) {
                this.sbErrors.exceptions.forEach((error, index, array) => {
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
                onStart = () => ({}),
                onFinish = () => ({}),
                onSuccess = () => ({}),
                onError = () => ({})
            } = {}
        ) {
            onStart()
            this.sbErrors = {}
            this.sbSending = true
            this.$root.errors = []

            if (method === "post") {
                axios
                    .post(url, data)
                    .then((response) => {
                        this.then(response.data)
                        if (resetForm !== false) {
                            this.form = {}
                        }
                        onSuccess(response.data)
                    })
                    .catch((error) => {
                        this.catch(error, shouldDisplayToast, showErrorsInModal)
                        onError(error.response.data)
                        if (showErrorsInModal && this.sbIsset(() => error.response.data.errors.exceptions)) {
                            this.$root.$emit("bv::show::modal", "modalError", "#btnShow")
                        }
                    })
                    .finally(() => {
                        this.sbSending = false
                        onFinish()
                    })
            } else if (method === "put") {
                axios
                    .put(url, data)
                    .then((response) => {
                        this.then(response.data)
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
