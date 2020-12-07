- [Custom components](#-custom-components)
  - [sending button](#loading-button)
  - [date picker](#date-picker)

# Request Mixin usage

---

### modo de usar basico

pode ser método post ou put.

```js
this.request("post", `${this.route}`, this.form);
```

---

### com opcionais

```js
this.request("post", `${this.route}`, this.form, {
  onSuccess: () => {
    this.$emit("saved");
    this.showModal = false;
  },
});
```

### não exibir os erros no lugar padrão (não inclui os erros do validation)

```js
this.request("post", `${this.route}`, this.form, {
  useCustomErrorsPosition:true
  onSuccess: () => {
      this.$emit("saved")
      this.showModal = false
  }
})
```

Com o componente abaixo exiba o erros aonde quiser.

```html
<display-errors :errors-prop="errors.custom_errors"></display-errors>
```

### no controller

```php
public function store(UserRequest $request)
    {
        try {
            User::create($request->validated());
            return response()->json(['message' => 'usuário salvo com sucesso.']); // mensagem customizada (opcional)
        } catch (\Throwable $th) {
            Log::error('ERROR #UC-001', ['error' => $th]);
            return response()->json(['errors' => ['custom_errors' => [
                'Erro ao salvar o usuário, motivo 1. ERROR: #UC-001',
                'Erro ao salvar o usuário, motivo 2. ERROR: #UC-001'
            ]]],422);
        }
    }
```
