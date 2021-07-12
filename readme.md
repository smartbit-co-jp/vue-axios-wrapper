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

});
```

## installation

```console
npm install sb-axios-wrapper
```

Then, register axios-wrapper in your app entry point (typically app.js or main.js):

```console
import AxiosWrapper from 'sb-axios-wrapper'
Vue.mixin(AxiosWrapper)
```

### Important: this mixin adds 4 attributes to the component mixin

```js
requestProcessing: (boolean)
responseErrors: (Object)  // (validation errors)
responseMessage: (string)
responseMessages: (array)
```

## Listen for package event

This package emit a "notify" event with status ("success" or "error") and the message (or messages) from response which can be used to display a notification to the user.

```js

const app = new Vue({
    el: '#app',
});

app.$root.$on('notify', (options) => {
    console.log(options)
})
```
