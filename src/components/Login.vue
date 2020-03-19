<template>
<div class="login_container">
  <div class="login_box">
    <!--头像区域-->
    <div class="avatar_box">
      <img src="../assets/logo.png" alt="avatar" />
    </div>
    <!--登录表单区域；loginForm动态获取数据；rules校验规则-->
    <!--ref引用，获取表单实例对象，调用后可以实现重置-->
    <div>
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="60px" class="login_form">
      <!--用户名-->
      <el-form-item prop="username">
        <el-input v-model="loginForm.username">
          <i slot="prefix" class="el-icon-user-solid"></i>
        </el-input>
      </el-form-item>
      <!--密码-->
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password">
          <i slot="prefix" class="el-icon-lock"></i>
        </el-input>
      </el-form-item>
      <!--按钮区域-->
      <el-form-item class="btns">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="resetLoginForm">重置</el-button>

      </el-form-item>
    </el-form>
  </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Login.vue',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 表单重置按钮
    resetLoginForm () {
      // console.log(this)
      // resetFields：element-ui提供的表单方法
      this.$refs.loginFormRef.resetFields()
    },
    // 登录表单预校验
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        console.log('valid', valid)
        if (!valid) {
          return valid
        }
        // !划重点，发起post登录请求
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) {
          console.log('登录失败')
          return this.$message.error('登录失败')
        }

        console.log(res, '登录成功')
        this.$message.success('登录成功')
        console.log(res)
        window.sessionStorage.setItem('token', res.data.token)
        // 编程时导航，产生了页面跳转
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);

  .avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;

    transform: translate(-50%,-50%);
    background-color: #fff;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }

  }
}
.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  /*左右边界*/
  padding: 0 20px;
  box-sizing: border-box;
}
.btns{
  display: flex;
  justify-content: flex-end;
}
</style>
