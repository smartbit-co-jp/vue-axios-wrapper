# AxiosWrapper Usage

## Basic usage:

### PUT or POST.

```js
this.request("post", this.route, this.form);
```

### With callback function.

```js
this.request("post", this.route, this.form, {
    onSuccess: () => {
        this.showModal = false
    }
});
```

### GET.

```js
this.request("get", this.route, {}, {
    onSuccess: (response) => {
        this.items = response.data.items
    }
});
```

---

### With options:

```js
this.request("post", this.route, this.form, {

    // (default is true)
    shouldNotifyError: false,

    // (default is true)
    shouldNotifySuccess: false,

    // these options will be passed to the notify function to be provided by you as a global function.
    errorOptions: {
        timeout: 2000,
    },
    successOptions: {
        timeout: 2000,
    }

    // Notify function to be provided by you as a global function (put in mixin).
    // This function is only a example.
    // notify(options = {}) {
    //     let toastOptions = {}
    //     if (options.type === 'success') {
    //         toastOptions.variant =  options.variant || "success"
    //         toastOptions.autoHideDelay = options.timeout || 1000
    //     } else if (options.type === 'error') {
    //         toastOptions.autoHideDelay = options.timeout || 3000
    //         toastOptions.variant = options.variant || 'danger'
    //     }
    //     toastOptions.title = options.title || "Notification"

    //     this.$root.$bvToast.toast(options.message, toastOptions)
    // }


});
```
