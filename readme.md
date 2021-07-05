# AxiosWrapper Usage

## Basic usage

### PUT or POST

```js
this.request("post", this.route, this.form);
```

### With callback function

```js
this.request("post", this.route, this.form, {
    onSuccess: () => {
        this.showModal = false
    }
});
```

### GET

```js
this.request("get", this.route, {}, {
    onSuccess: (response) => {
        this.items = response.data.items
    }
});
```

---

### With options

```js
this.request("post", this.route, this.form, {

    // (defaul is true)
    shouldNotifyError: false,

    // (defaul is true)
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

## installation

```console
npm install sb-axios-wrapper
```

Then, register axios-wrapper in your app entry point (typically app.js or main.js):

```console
import AxiosWrapper from 'sb-axios-wrapper'
Vue.use(AxiosWrapper)
```

### Important: this mixin adds 2 attributes to the component mixin

```js

// true when request is in proccess
processing: (boolean)

// errors contain validation errors
errors: (array)
```




