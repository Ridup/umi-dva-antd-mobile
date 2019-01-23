import {Button, InputItem, List, Toast, WhiteSpace, WingBlank} from 'antd-mobile';
import {createForm, Form} from 'rc-form';
import React from 'react';
// @ts-ignore
import Regex from '@/utils/regex';
// @ts-ignore
import {execute} from '@/services/api';
import router from 'umi/router';
import BizIcon from '../../components/BizIcon';
import {connect} from 'dva';
import {Base64} from 'js-base64';

const errorIcon = (desc) => (<div><BizIcon type={"error"}/><p>{desc}</p></div>);

@connect(({base, loading}) => ({
  base: base,
  loading: loading.models.base,
}))
class Login extends React.PureComponent<{ form: Form }> {

  public doLogin = (ops) => {
    this.props.form.validateFields((error, value) => {
        if (null === error) {
          let passwordEncode = Base64.encode(value.password);
          let param = {
            busiNo: "600028",
            busiObject: {
              identifyKind: "TELEPHONE",
              identifiers: value.account,
              authPassword: passwordEncode,
              identifySource: "Antd Mobile"
            }
          };
          // @ts-ignore
          const {dispatch} = this.props;
          dispatch({
            type: 'base/sendRequest',
            payload: param,
            callback: (res) => {
              console.log("res==" + JSON.stringify(res));
              if (res.success) {
                let currentUser = res.data;
                if (currentUser === null) {
                  Toast.fail("登陆异常", 2, null, false);
                } else {
                  let storage = window.localStorage;
                  storage.setItem("userInfo", JSON.stringify(currentUser));
                  router.push("/index");
                }
              } else {
                Toast.fail(res.errMsg, 2, null, false);
              }
            }
          });
        }
      }
    );
  }

  public register = (ops) => {
    Toast.info(ops, 2, null, false);
  }

  public render() {
    const {getFieldProps, getFieldError} = this.props.form;
    return (
      <form>
        <div>
          <WingBlank>
            <List>
              <InputItem
                {...getFieldProps('account', {
                  rules: [{required: true, message: "请输入手机号"}, {
                    pattern: Regex.phone,
                    message: "请输入正确的手机号码"
                  }]
                })}
                placeholder="请输入手机号"
                clear
                error={!!getFieldError('account')}
                onErrorClick={() => {
                  // @ts-ignore
                  Toast.info(errorIcon(getFieldError('account').join('、')), 1, null, false);
                }}>
                <BizIcon type={"user"}/>
              </InputItem>
            </List>
            <WhiteSpace/>
            <List>
              <InputItem
                {...getFieldProps('password', {rules: [{required: true, message: "请输入密码"}]})}
                type={"password"}
                placeholder="请输入密码"
                clear
                error={!!getFieldError('password')}
                onErrorClick={() => {
                  // @ts-ignore
                  Toast.info(errorIcon(getFieldError('password').join('、')), 1, null, false);
                }}>
                <BizIcon type={"lock"}/>
              </InputItem>
            </List>
            <WhiteSpace size={"lg"}/>
            <List>
              <Button type={"primary"} onClick={() => {
                this.doLogin("登陆")
              }} style={{}}>
                登陆
              </Button>
            </List>
            <WhiteSpace/>
            <List>
              <Button onClick={() => {
                this.register("注册")
              }}>
                注册
              </Button>
            </List>
          </WingBlank>
        </div>
      </form>
    );
  }
}

export default createForm()(Login);
