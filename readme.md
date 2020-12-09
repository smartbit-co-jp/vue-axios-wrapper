# Request Mixin usage


### Modo de usar básico:

Pode ser método, post ou put.

```js
this.request("post", this.route, this.form);
```

---

### Com opcionais:

```js
this.request("post", this.route, this.form, {
  onSuccess: () => { // método a ser chamado se o post der certo
    this.$emit("saved");
    this.showModal = false;
  },
});
```

### Se não quiser exibir os erros no lugar padrão(não inclui os erros do validation):

```js
this.request("post", `${this.route}`, this.form, {
  shouldDisplayToast:false // adicione essa linha
})
```

Com o componente abaixo, exiba os erros onde quiser.

```html
<display-errors :errors="sbErrors.custom_errors"></display-errors>
```

### No controller:

```php
public function store(UserRequest $request)
    {
        try {
            User::create($request->validated());
            // Se passar essa chave "message", essa mensagem será exibida automaticamente no Vue, sa não, será exibida uma mensagem padrão
            return response()->json(['message' => 'usuário salvo com sucesso.']); // mensagem customizada (opcional)
        } catch (\Throwable $th) {
            // Faz o log do erro para poder debugar posteriormente.
            Log::error('ERROR #UC-001', ['error' => $th]); 

            // As mensagens de erro são obrigatórias, ao passar as mensagens no formato abaixo, as mesmas serão exibidas automaticamente no Vue.
            // sempre será um array de erros, mesmo se for só um erro.
            return response()->json(['errors' => ['custom_errors' => [
                'Erro ao salvar o usuário, motivo 1. ERROR: #UC-001'
            ]]],422);
        }
    }
```

---
### customization

```js
var app = new Vue({
    data:{
        sbAxiosWrapper:{
          toast:{
            title: 'ezHaken',
            defaultMessage: '保存しました。'
          }
        }
    },
    mixins: [require('spark')],
});
```

--- 

### parametros

```php
resetForm: boolean
// Determina se o form vai ser resetado depois do post/put.
// Por padrão no método post o resetForm é true,
// e no método put o padrão é false

shouldDisplayToast: boolean
// Determina se tem que exibir o toast ou não 
// o padrão é true

onSuccess: função anonima
// Coloque aqui dentro o que deve ser feito depois do post/put ser terminado com sucesso.

```

```js
Exemplo

this.request("post", this.route, this.form, {
  shouldDisplayToast: false,
  resetForm:false,
  onSuccess: () => {
      this.$emit("saved");
      this.showModal = false;
  },
});
```

---

### loading button

```js
<loading-button 
    @click="sendForm" // chama seu método.
    :loading="sbSending" 
    variant="warning" // Cor do botão opcional (padrão success)
    class="mt-2 float-right" // classe opcional
>
    salvar // Valor do botão opcional (padrão save)
</loading-button>
```

result
![alt text](img/warning-button.png)