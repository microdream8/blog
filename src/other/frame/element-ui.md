---
title: 'element-ui学习'
sidebar: auto
collapsable: true
---

# element-ui学习
## 表单校验
### 方法一：表单上加rules对象
```html
<el-form class="apply-form first-form" :model="formData" :rules="rule" ref="form">
    <el-form-item label="姓名" prop="visitorName">
        <el-input v-model="formData.visitorName" placeholder="请输入姓名" clearable></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="cardCode">
       <el-input v-model="formData.cardCode" :maxlength="18" placeholder="请输入身份证号" clearable></el-input>
    </el-form-item>
    <!-- 提交按钮 -->
  <el-button class="btn-login" type="primary" size="medium" @click="submitForm('form')">立即登录</el-button>
</el-form>
```

这种方式需要在data()中写入rule{},对于需要校验字段prop中的如visitorName写上验证规则，如下：

```js
data() {
  return {
    formData: {
      visitorName: '',
      cardType: 1,
      cardCode: ''
    },
    rule: {
      visitorName: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
        {
          required: true,
          pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
          message: '姓名不支持特殊字符',
          trigger: 'blur'
        }
      ],
      cardCode: [
        { required: true, message: '请输入身份证号', trigger: 'blur' },
        { min: 15, max: 18, message: '请如实填写18位号码，以供学校保卫科核对', trigger: 'blur' },
        {
          required: true,
          pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
          message: '请输入正确的身份证号码',
          trigger: 'blur'
      ]
    }
  }
}
methods: {
  submitForm(formName) {
    this.$refs[formName].validate(valid => {
      if (valid) {
        //如果通过验证 to do...
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
}
```

其中对于有些需要自定义的校验规则可以作为变量写在data中：

实现思路
* html中给el-form增加 :rules="rules"
* html中在el-form-item中增加属性 prop="名称"
* js中直接在data中在rules中的名称对应中设置 validator: 验证器名称，
* js在data中return之上书写验证器对应的js验证逻辑
* html部分
```html
<el-form ref="form" :rules="rules" :model="form" label-width="300px">    
  <el-form-item label="发货人电话" prop="phone">
    <el-input class="inp" v-model="form.phone" auto-complete="true"></el-input>
  </el-form-item>
</el-form>
```
* js部分
```js
<script>
export default {
  data() {
    // 此处自定义校验手机号码js逻辑
    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('号码不能为空!!'))
      }
      setTimeout(() => {
        if (!phoneReg.test(value)) {
          callback(new Error('格式有误'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      form: {    
        phone: '',
      },
      // 校验规则
      rules: {
        // 校验手机号码，主要通过validator来指定验证器名称
        phone: [{ required: true, validator: validatePhone, trigger: 'blur' }]
      },
    }
  }
}
</script>
// data() {
//   let reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,12}$/
//   var validateNewPwd = (rule, value, callback) => {
//     if (!reg.test(value)) {
//       callback(new Error('密码应是6-12位数字、字母或字符！'))
//     } else if (this.form.oldPasswd === value) {
//       callback(new Error('新密码与旧密码不可一致！'))
//     } else {
//       callback()
//     }
//   }
//   var validateComfirmPwd = (rule, value, callback) => {
//     if (!reg.test(value)) {
//       callback(new Error('密码应是6-12位数字、字母或字符！'))
//     } else if (this.form.newPasswd !== value) {
//       callback(new Error('确认密码与新密码不一致！'))
//     } else {
//       callback()
//     }
//   }
//   return {
//     form: {
//       newPasswd: '',
//       comfirmPwd: ''
//     },
//     rules: {
//       newPasswd: [
//         { required: true, message: '请输入新密码', trigger: 'blur' },
//         { validator: validateNewPwd, trigger: 'blur' }
//       ],
//       comfirmPwd: [
//         { required: true, message: '请输入确认密码', trigger: 'blur' },
//         { validator: validateComfirmPwd, trigger: 'blur' }
//       ]
//     }
//   }
// }
```

比较适用于<b>表单全部字段校验或需要校验字段类型比较简单</b>的数据类型

### 方法二：在el-form-item单个添加
实现思路
* html中给el-form增加 :rules="rules"
* html中在el-form-item中增加属性 prop="名称"
* js中直接在data中定义rules:{}
* html部分
```html
<el-form ref="form" :rules="rules" :model="form" label-width="300px">
  <el-form-item label="发货地址：" prop="fAdderss">
    <el-input class="inp" v-model="form.fAdderss" auto-complete="true"></el-input>
    <el-button type="primary" class="btn-add" @click="onSubmit">常用地址</el-button>
  </el-form-item>
</el-form>
<!-- <el-form-item label="电话号码" class="el-form-item--small has-error" :prop="phoneNum" :rules="[{ required: true, message: '请输入电话号码', trigger: 'blur' }, { required: true, pattern: /^((13|14|15|16|17|18)[0-9]{1}\d{8})|((166|199|198)[0-9]{1}\d{7})$/, message: '请输入正确的电话号码', trigger: 'blur' }]">
  <el-input v-model="v.phoneNum" :maxlength="11" placeholder clearable></el-input>
</el-form-item> -->
```
* js部分
```js
<script>
export default {
  data() {
    return {
      form: {
        fAdderss: '',
      },
      // 校验规则
      rules: {
        fAdderss: [
        { required: true, //是否必填
          message: '地址不能为空', //规则
          trigger: 'blur'  //何事件触发
        },
        //可以设置双重验证标准
        { min: 3, max: 5,  message: '长度在 3 到 5 个字符', }
      ]
      }
    }
  }
}
</script>
```

这种方式适用于需要个别检验的字段，或者表单字段有变动的校验

### 方法三：动态增减表单项

先看需求效果图

<img src="../../imgs/other/frame/ele-ui_1.png" style="width: 80%;">

对应的数据结构：

<img src="../../imgs/other/frame/ele-ui_2.png" style="width: 80%;">

对应删除增加表单项的操作为：

```js
addPhone() {
    let len = this.formData.phoneInfoList.length
    this.$set(this.formData.phoneInfoList, len, {
        relation: [],
        phoneNum: '',
        relationType: 0,
        schoolId: this.selectedUser.schoolId,
        userCode: this.selectedUser.userCode
    })
},
deletePhone(item) {
    if (this.formData.phoneInfoList.length > 1) {
        // 表示先获取这个元素的下标，然后从这个下标开始计算，删除长度为1的元素
        this.formData.phoneInfoList.splice(this.formData.phoneInfoList.indexOf(item), 1);
    } else {
        this.$vux.toast.text('至少保留一个家长亲情号码！')
        return false
    }
},
```

这样的rule、prop直接写就对应不上表单mode绑定的对象上的属性，所以在此要用循环的方式找到要校验的字段所在数据中的索引，然后再以字符串拼接的方式连上校验字段名称：

<img src="../../imgs/other/frame/ele-ui_3.png" style="width: 80%;">

渲染出来的html为：

<img src="../../imgs/other/frame/ele-ui_4.png" style="width: 80%;">

### form提交时，滚动到第一个错误信息处
```js
this.$refs['form'].validate(valid => {
if (valid) {
// to do
} else {
　　setTimeout(() => {
　　const isError = document.querySelector('.is-error');
　　const input = isError.querySelector('input')
　　input.focus();
}, 1000)
return false;
}
```

## 图片上传相关
如果要自定义上传图片的展示效果，需要两步：

1. show-file-list： false; 这个属性会不展示上传的图片列表
2. 自己添加div标签，根据个人口味(style)和布局来展示图片列表，这样的好处，还有图片的一些操作，比如删除，预览的位置，图标都可以自定义
3. ps: 目前不支持编辑图片
4. 在表单中引入el-upload，验证的时候要调用
```js
this.$refs['form'].clearValidate(prop) // 不然的话，错误信息会一直在，prop为字段名
```


