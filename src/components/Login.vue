<template>
  <div>
    <input type="text" v-model="userName" placeholder="请输入用户名"/>
    <input type="passWord" v-model="passWord" placeholder="请输入密码"/>
    <button type="button" @click="loginSub()">提交</button>
  </div>
</template>

<script>
  import crypto from 'crypto'
  import axios  from 'axios'

  export default {
    name: 'Login',
    data(){
      return {
        userName: '',
        passWord: ''
      }
    },
    methods: {
      loginSub() {  //此处不要用箭头函数，会改变this的指向

        if (this.userName == '' || this.passWord == '') {
          alert('用户名或者密码不能为空!')
        }
        else {
          const md5 = crypto.createHash('md5');
          const passwordMD5 = md5.update(this.passWord).digest('hex').toLocaleUpperCase();
          axios.post('/pvmApi/npauth/v1/NPUSER/tokens', {username: this.userName, password: passwordMD5}).then(response=> {
              if (response.code == 200) {
                var token = response.data.tokenKey;
                axios.get('/pvmApi/npauth/v1/user/tokens/' + token,).then(data => {
                  if (data.code == 200) {
                    sessionStorage.setItem('roles', data.data.roles);
                    sessionStorage.setItem('toKenTime', new Date().getTime());
                    this.$router.push({name:"homeLink"})
                  }

                })
              }
            }
          )
        }
      }
    }
  }
</script>


<style scoped>

</style>
