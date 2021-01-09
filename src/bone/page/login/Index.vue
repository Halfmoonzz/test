<template>
  <div class="login-overflow">
    <div class="login--container">
      <div class="login-contents">
        <div style="position: absolute;margin-top: -75px;margin-left: 8%;display: flex;align-items: center;">
          <img src="../../../../static/image/login/logo.png" width="55px" height="55px" />
          <span style="margin-left: 5px;font-size: 35px;color: #00a0e9;vertical-align: super;    font-family: Adobe Heiti Std;">宗西怡毕业设计</span>
        </div>
        <el-row>
          <el-col :span="14" style="background: url(../../../../static/image/login/content-left.png) 50% 50%;background-size: 85%;background-repeat: no-repeat;" />
          <el-col :span="10" style="display: inline-flex;align-items: center;justify-content: center;">
            <div style="background: #ecf9ff;height:360px;width: 340px;padding: 30px;position: relative">
              <span style="font-size: 20px;">账户登录</span>
              <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
                <el-form-item prop="username" style="margin-bottom: 40px">
                  <label class="form_label">
                    <img style="display: inline-block;" src="../../../../static/image/login/user.png" />
                  </label>
                  <el-input name="username" id="username" type="text" v-model="loginForm.username" autofocus placeholder="用户名" />
                </el-form-item>

                <el-form-item prop="password">
                  <label class="form_label">
                    <img src="../../../../static/image/login/password.png" />
                  </label>
                  <el-input name="password" id="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码" />
                </el-form-item>
                <div class="assist" style="margin-bottom: 20px;">
                  <el-checkbox v-model="checked" class="rememberPassWord" @change="checkChange">
                    记住密码
                  </el-checkbox>
                </div>
                <div style="position: absolute;left: 30px;width: calc(100% - 60px);bottom: 40px;">
                  <el-button type="primary" style="width: 100%;" :loading="loading" @click.native.prevent="handleLogin">登 录 </el-button>
                  <div class="assist" style="margin-top: 15px;">
                    <span class="form-span" @click="forgetPassword">
                      忘记密码?
                    </span>
                  </div>
                </div>
              </el-form>
            </div>
          </el-col>
        </el-row>
        <div class="word-script">
          山东科技大学 @2021
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';

const validateUsername = (rule, value, callback) => {
  callback();
};

const validatePassword = (rule, value, callback) => {
  callback();
};

const validateIdentify = (rule, value, callback) => {
  callback();
};

const login = {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      checked: false
    };
  },
  methods: {
    /********显示密码，之前改的时候不小心删除，后续进行添加************/
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
    },
    //登录
    handleLogin() {
      this.checkChange();
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push('/PlaningMap');
            })
            .catch(data => {
              if (data.data.identify) {
                this.showIdentify = true;
                console.log(this.$refs);
                this.refreshIdentifyCode();
              }
              this.loading = false;
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    //记住密码
    checkChange() {
      if (this.checked) {
        Cookies.set('userInfo', JSON.stringify(this.loginForm), { expires: 7 });
      } else {
        if (Cookies.get('userInfo')) {
          Cookies.remove('userInfo');
        }
      }
    },
    //忘记密码
    forgetPassword() {?
      this.$message({
        showClose: true,
        message: '请联系管理员:上海',
        type: 'success'
      });
    }
  },
  mounted() {
    //记住密码
    if (Cookies.get('userInfo')) {
      this.checked = true;
      this.loginForm = JSON.parse(Cookies.get('userInfo'));
    }
  }
};
export default login;
</script>

<style rel="stylesheet/scss" lang="scss">
  /*
   * 背景图片的相关设置
   */
  @mixin bk_set($size) {
    background-repeat: no-repeat;
    background-size: ($size);
    background-position: center;
  }

  @mixin font_set {
    font-family: MicrosoftYaHeiLight;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    letter-spacing: 0;
    text-align: center;
  }

  .login-overflow {
    overflow: hidden;
    height: 100%;
    .login--container {
      height: 100%;
      min-height: 625px;
      min-width: 1366px;
      display: flex;
      align-items: center;
      .login-contents {
        width: 100%;
        min-width: 1366px;
        background: #00a0e9;
        .el-row {
          width: 100%;
          overflow: hidden;
          height: calc(60vh + 100px);
          .el-col {
            height: 100%;
            /**
                                * form相关样式
                                */
            .el-form {
              display: flex;
              margin-top: 40px;
              flex-wrap: wrap;
              .el-form-item {
                width: 100%;
                .el-form-item__content {
                  height: 45px;
                  .form_label {
                    position: absolute;
                    z-index: 1000;
                    background: #e2e2e4;
                    width: 45px;
                    height: 45px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                  }
                }
                .el-input input {
                  border: 1px solid rgba(0, 0, 0, 0.12);
                  /*color: rgba(0, 0, 0, 0.7);*/
                  padding-left: 55px;
                  background: #fff !important;
                  height: 45px;
                  line-height: 45px;
                }
              }
              .el-button {
                width: 100%;
                background: #00a0e9;
                @include bk_set(cover);
                font-size: 18px;
                color: #ffffff;
              }
              .assist {
                width: 100%;
                .rememberPassWord {
                }
                .form-span {
                  float: left;
                  @include font-set;
                  cursor: pointer;
                }
              }
            }
          }
        }
        /**
          * 文字描述
          */
        .word-script {
          @include font-set;
          position: absolute;
          text-align: center;
          width: 100%;
          margin-top: 20px;
        }
      }
    }
  }
</style>
