<template>
    <div class="login">
        <img src="../assets/logo.png" alt="logo">
        <h3>Entrar</h3>
        <input type="email" placeholder="E-mail" value=""><br>
        <input type="password" value="" placeholder="Senha"><br>
        <button>ENTRAR</button>
        <p>
            Novo por aqui? Precisa <a href="/sign-up">se cadastrar?</a>
        </p>
    </div>
</template>
<script>
export default{
    name: 'LoginForm',
    data() {
        return {};
    },
    methods: {}
}
</script>
<style scoped>
.login {
    margin-top: 40px;
}
input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
    height: 25px;
}
button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
    height: 25px;
}
</style>