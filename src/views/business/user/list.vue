<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="人员姓名" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchObj.level" clearable placeholder="职称">
          <el-option :value="1" label="管理人员" />
          <el-option :value="2" label="销售人员" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.beginDate"
          type="datetime"
          placeholder="起始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.endDate"
          type="datetime"
          placeholder="截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button type="primary" size="medium" icon="el-icon-search" @click="doQuery()">查 询</el-button>
      <el-button type="info" size="medium" icon="el-icon-brush" @click="resetData()">清空</el-button>
      <el-button type="default" size="medium" icon="el-icon-plus" @click="doAdd()">添加</el-button>
    </el-form>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (pageNo - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="80" />
      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? '高级讲师' : '首席讲师' }}
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="资历" />
      <el-table-column prop="gmtCreate" label="添加时间" width="160" />
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/user/form/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button style="margin-left: 2%" type="danger" size="mini" icon="el-icon-delete" @click="deleteById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="pageNo"
      :page-size="pageSize"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      background
      layout="total, prev, pager, next, jumper"
      @current-change="doQuery"
    />
  </div>
</template>
<script>
import staff from '@/api/business/user/list'

export default {
  data() {
    return {
      listLoading: true, // 是否显示loading信息
      list: null, // 数据列表
      total: 0, // 总记录数
      pageNo: 1, // 页码
      pageSize: 10, // 每页记录数
      searchObj: {} // 查询条件
    }
  },
  created() {
    // 当页面加载时获取数据
    this.doQuery()
  },
  methods: {
    doQuery(pageNo = 1) {
      this.pageNo = pageNo
      // 调用api层获取数据库中的数据
      this.listLoading = true
      this.searchObj.pageNo = this.pageNo
      this.searchObj.pageSize = this.pageSize
      staff
        .page(this.searchObj)
        .then((response) => {
          this.list = response.data.rows
          this.total = response.data.total
          this.listLoading = false
        })
    },
    resetData() {
      this.searchObj = {}
      this.doQuery()
    },
    doAdd() {
      this.$router.push({ path: '/user/form' })
    },
    deleteById(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return staff.deleteById(id)
        })
        .then(() => {
          this.doQuery()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch((response) => {
          // 失败
          if (response === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        })
    }
  }
}
</script>
