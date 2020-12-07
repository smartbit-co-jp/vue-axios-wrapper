- [Custom components](#-custom-components)
  - [sending button](#loading-button)
  - [date picker](#date-picker)

# Request Mixin usage

---

### Modo de usar básico:

Pode ser método, post ou put.

```js
this.request("post", `${this.route}`, this.form);
```

---

### Com opcionais:

```js
this.request("post", `${this.route}`, this.form, {
  onSuccess: () => {
    this.$emit("saved");
    this.showModal = false;
  },
});
```

### Se não quiser exibir os erros no lugar padrão(não inclui os erros do validation).

```js
this.request("post", `${this.route}`, this.form, {
  useCustomErrorsPosition:true
  onSuccess: () => {
      this.$emit("saved")
      this.showModal = false
  }
})
```

Com o componente abaixo, exiba os erros onde quiser.

```html
<display-errors :errors-prop="errors.custom_errors"></display-errors>
```

### No controller

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
