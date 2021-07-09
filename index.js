export default {
    install(Vue, options) {
        let eventBus = options.eventBus
        if (!(eventBus instanceof Vue)) {
            eventBus = new Vue({})
        }
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
                    onStart()
                    this.errors = []
                    this.processing = true

                   let manageErrors = (error) => {
                        errorOptions.type = 'error'
                        errorOptions.message = error.response.data.message
                        errorOptions.messages = error.response.data.messages
                        this.errors = error.response.data.errors || []
                        if (shouldNotifyError) {
                            eventBus.$emit('notify', errorOptions);
                        }
                    }
                    let manageSuccess = (response) => {
                        successOptions.type = 'success'
                        successOptions.message = response.data.message
                        successOptions.messages = response.data.messages
                        if (shouldNotifySuccess) {
                            eventBus.$emit('notify', successOptions);
                        }
                    }

                    if (method === 'get') {
                        axios.get(url).then((response) => {
                            onSuccess(response)
                        }).catch((error) => {

                            if (error.response) {
                                manageErrors(error)
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
                            manageSuccess(response)
                            if (resetForm === true) {
                                this.form = {}
                            }
                            onSuccess(response)

                        }).catch((error) => {
                            if (error.response) {
                                manageErrors(error)
                                onError(error)
                            } else {
                                throw error;
                            }
                        }).finally(() => {
                            this.processing = false
                            onFinish()
                        })
                    } else if (method === 'delete') {
                        axios.delete(url).then((response) => {
                            manageSuccess(response)
                            onSuccess(response)
                        }).catch((error) => {

                            if (error.response) {
                                manageErrors(error)
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

