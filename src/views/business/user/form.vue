<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="人员名称">
        <el-input v-model="person.name" />
      </el-form-item>
      <el-form-item label="人员排序">
        <el-input-number v-model="person.sort" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="人员职称">
        <el-select v-model="person.level" clearable placeholder="请选择">
          <el-option :value="1" label="管理人员" />
          <el-option :value="2" label="销售人员" /> </el-select>
      </el-form-item>
      <el-form-item label="人员资历">
        <el-input v-model="person.career" />
      </el-form-item>
      <el-form-item label="人员简介">
        <el-input v-model="person.intro" :rows="10" type="textarea" />
      </el-form-item>
      <!-- 人员头像 -->
      <el-form-item label="人员头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="person.avatar" />
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">
          Change Avatar
        </el-button>
        <!-- v-show:是否显示上传组件 :key:控件唯一标识 :url:后台上传的url地址 @close:关闭上传组件 @crop-upload-success:上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :key="imagecropperKey"
          :width="300"
          :height="300"
          :url="BASE_API+'/service/oss/upload'"
          field="file"
          @crop-upload-success="cropSuccess"
          @close="close"
        />
      </el-form-item>
      <el-form-item>
        <el-button style="text-align: center;" :disabled="saveBtnDisabled" type="primary" @click="saveData">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import staff from '@/api/business/user/form'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import defaultAvatar from '@/assets/images/avatar/default.jpeg'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      person: {
        avatar: defaultAvatar
      },
      saveBtnDisabled: false, // 保存按钮禁用
      BASE_API: process.env.VUE_APP_UPLOAD_API, // 接口API地址
      imagecropperShow: false, // 是否显示上传组件
      imagecropperKey: 0 // 上传组件ID
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.getDataById(this.$route.params.id)
    }
  },
  methods: {
    getDataById(id) {
      staff.getById(id).then(response => {
        this.person = response.data.item
      }).catch((error) => {
        console.log(error)
        this.$message({
          type: 'error',
          message: '获取数据失败'
        })
      })
    },
    saveData() {
      staff.save(this.person).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.$router.push({ path: '/user/list' })
      })
    },
    cropSuccess(data) {
      console.log(data)
      this.imagecropperShow = false
      this.person.avatar = data.uploadUrl
      this.imagecropperKey = this.imagecropperKey + 1
    },
    close() {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    }
  }
}
</script>
