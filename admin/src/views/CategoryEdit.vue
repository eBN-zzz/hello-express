<template>
  <div class="">
    <h3>{{ id ? '编辑' : '新建' }}分类</h3>
    <el-form :model="model" ref="form" label-width="120px">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategoryEdit',
  props: {
    id: { type: String }
  },
  data() {
    return {
      model: {
        name: ''
      },
      parents: []
    }
  },
  created() {
    this.fetchParents()
    this.id && this.fetch()
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`)
      this.model = res.data
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`)
      this.parents = res.data
    },
    async save() {
      if (this.id) {
        await this.$http.put(`rest/categories/${this.id}`, this.model)
      } else {
        await this.$http.post(`rest/categories`, this.model)
      }
      const msg = this.id ? '编辑成功！' : '保存成功！'
      this.$message.success(msg)
      this.$router.push('/categories/list')
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style></style>
