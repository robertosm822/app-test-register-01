<template>
    <div class="login">
        <img src="../assets/logo.png" alt="logo">
        <h3>Criar uma nova conta</h3>
        <input type="email" v-model="email" placeholder="E-mail" value=""><br>
        <input type="password" v-model="password" value="" placeholder="Senha"><br>
        <button @click="signUp">REGISTRAR</button>
        <p>
            Voltar para o <router-link to="/login"> Login</router-link>?
        </p>
    </div>
</template>
<script>

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default{
    name: 'SignUpForm',
    data() {
        return {
            email:'',
            password: '',
        }
    },
    methods: {
        signUp () {
            console.log({'email':this.email, 'pass':this.password});
            /* eslint-disable */
            createUserWithEmailAndPassword(getAuth(this.$firebase), this.email, this.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log({'code':errorCode, 'message':errorMessage});
            });
        }
    }
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