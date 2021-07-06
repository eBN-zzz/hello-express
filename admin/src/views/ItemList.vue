<template>
  <div>
    <el-table :data="items" style="width: 100%" border>
      <el-table-column prop="_id" label="ID" width="200"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <el-table-column label="图标">
        <template v-slot="{ row }">
          <el-image :src="row.icon" fit="fill" :lazy="true"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="{ row }">
          <el-button type="primary" size="mini" @click="edit(row._id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="remove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ItemList',
  data() {
    return {
      items: []
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('rest/items')
      this.items = res.data
    },
    edit(id) {
      this.$router.push(`/items/edit/${id}`)
    },
    async remove(row) {
      this.$confirm(`是否确定删除分类 "${row.name}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`rest/items/${row._id}`)
          this.$message.success('删除成功！')
          this.fetch()
        })
        .catch(err => {
          this.$message.warning('已取消')
        })
    }
  }
}
</script>

<style></style>
