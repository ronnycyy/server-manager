<template>
  <el-container style="height: 100vh">
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>admin</span>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu
          router
          :default-openeds="['1']"
          unique-opened
          :default-active="$route.path">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-home"></i>模块1
            </template>
            <el-menu-item-group>
              <template slot="title">标题</template>
              <el-menu-item index="/option1">菜单1</el-menu-item>
              <el-menu-item index="/option2">菜单2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-home"></i>模块2
            </template>
            <el-menu-item-group>
              <template slot="title">标题</template>
              <el-menu-item>菜单1</el-menu-item>
              <el-menu-item>菜单2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view :key="$route.path"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>


<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2020-11-15",
      name: "ronny",
      address: "Shenzhen. China",
    };
    return {
      tableData: Array(20).fill(item),
    };
  },
};
</script>