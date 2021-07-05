export default {
    install(Vue, options) {

        Vue.mixin({
            data() {
                return {
                    processing: false,
                    errors: []
                }
            },
            methods: {
                request(
                    method,
                    url,
                    data = {},
                    {
                        onStart = () => ({}),
                        onFinish = () => ({}),
                        onSuccess = () => ({}),
                        onError = () => ({}),
                        resetForm = true,
                        errorOptions = {},
                        successOptions = {},
                        shouldNotifyError = true,
                        shouldNotifySuccess = true,
                    } = {}
                ) {
                    errorOptions.type = 'error'
                    successOptions.type = 'success'
                    onStart()
                    this.errors = []
                    this.processing = true
                    // TODO implement delete method
                    if (method === 'get') {
                        axios.get(url).then((response) => {
                            onSuccess(response)
                        }).catch((error) => {

                            if (error.response) {
                                errorOptions.message = error.response.data.message
                                this.notify(errorOptions)
                                onError(error)
                            } else {
                                throw error;
                            }

                        }).finally(() => {
                            this.processing = false
                            onFinish()
                        })
                    } else if (method === "post" || method === 'put') {
                        axios[method](url, data).then((response) => {

                            successOptions.message = response.data.message

                            if (!response.data.success && shouldNotifyError) {
                                errorOptions.message = response.data.message
                                this.notify(errorOptions)
                                return
                            }

                            if (shouldNotifySuccess) {
                                this.notify(successOptions)
                            }

                            if (resetForm === true) {
                                this.form = {}
                            }

                            onSuccess(response)

                        }).catch((error) => {
                            if (error.response) {

                                errorOptions.message = error.response.data.message
                                this.errors = error.response.data.errors || []

                                if (shouldNotifyError) {
                                    this.notify(errorOptions)
                                }

                                onError(error)

                            } else {
                                throw error;
                            }
                        }).finally(() => {
                            this.processing = false
                            onFinish()
                        })
                    }
                },
            }
        })

    }
}

