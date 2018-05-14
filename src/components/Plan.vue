<template>
  <div style="margin:10px 10px 0 10px; " class="clearfix">
    <div style="width:200px; background: #fff;border-radius: 2px;min-height: 700px; position: absolute;">
      <ul class="ul-list  clearfix">
        <li v-for="(item,index) in tab" @click="tabClick(index)"
            v-bind:class="[item.active ? 'li-list pull-left active' : 'li-list pull-left']">{{item.name}}
        </li>
      </ul>
      <div class="tree-box">
        <el-ztree :tree-data="ztreeData" :settings="ztreeSettings"></el-ztree>
      </div>
    </div>
    <div class="page-content">
      <h1 class="page-title">运维管理-视频巡检计划</h1>
      <div class="clearfix " style="padding-top:15px; padding-left: 15px">
        <div class="pull-left  mr15">
          <el-button type="primary" size="small">新增</el-button>
        </div>
        <div class="pull-left mr15">
          <el-select size="small" placeholder="轮巡状态" v-model="value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>

          </el-select>
        </div>
        <div class="pull-left ">
          <el-input size="small" placeholder="巡检计划名称">
          </el-input>

        </div>
        <div class="pull-left ">
          <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
        </div>
      </div>
      <div style="margin-top:10px; padding-left:15px">
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          tooltip-effect="dark"
          style="width: 100%"
          size="small">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>

          <slot v-for="colunm in colunms">
            <el-table-column :prop="colunm.field"
                             :label="colunm.name">

            </el-table-column>
          </slot>


        </el-table>
        <div class="clearfix" style=" border:1px  solid #dedede;    background: #efefef;padding:5px;">
          <div class="block pull-right">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              background
              :current-page="activePage"
              :page-sizes="pageSizes"
              :page-size="pageSize"
              layout=" total,prev, pager, next,sizes, jumper"
              :total="count">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import zTree from './common/Ztree.vue'
  export default {
    data(){
      return {
        tableData: [],
        options: [{value: '', label: '全部'},{value: 0, label: '未开始'}, {value: 1, label: '执行中'}, {value: 2, label: '已过期'}],
        colunms: [
          {
            name: '巡检计划名称',
            field: 'PlanName'
          }, {
            name: '分组名称',
            field: 'GroupName'


          }, {
            name: '设备数量',
            field: 'GroupObjIDS'
          }
        ],
        value: '',
        count: 0,
        pageSize: 10,
        pageSizes: [10, 15, 20, 30],
        activePage: 1,
        ztreeSettings: {
          data: {
            simpleData: {
              enable: true,
              idKey: "NodeID",
              pIdKey: "ParentNodeID"
            },
            key: {
              name: 'OrganName'
            }
          },
          callback: {
            onClick: function (event, treeId, treeNode) {

            }
          }
        },
        ztreeData: [],
        tab: [{
          name: '组织机构模式',
          tab: 'camera',
          active: true,
        },
          {
            name: '自定义分组',
            tab: 'camdef',
            active: false,
          }
        ]
      }
    },
    components: {
      'el-ztree': zTree
    },
    methods: {
      /*改变pageSize*/
      handleSizeChange(pageSize){
        this.activePage = 1;
        this.pageSize = pageSize;
        this.getList()
      },
      handleCurrentChange(page){
        this.activePage = page;
        this.getList()
      },
      getList(){
        this.$axios.get('/newApi/pollplan/planlist', {
          params: {
            planSearchService: '',
            pageNo: this.activePage,
            pageSize: this.pageSize,
            planName: '',
            pollType: 2,
            channelsGroup: 1,
            pollStatus: '',
            indateType: '',
            tableGridOrder: '',
            tableGridOrderField: ''

          }
        }).then((data) => {
          if (data.resultCode == '200') {
            this.tableData = data.data;
            this.count = data.TotalNum
          } else {
            this.tableData = [];
            this.count = 0;
          }
        })


      },
      getOrg(){
        this.$axios.post('/newApi/sort/QueryOrgAndChanInfo').then((data) => {
          if (data.resultCode == '200') {
            this.ztreeData = data.data;
          } else {
            this.ztreeData = [];

          }
        })

      },
      tabClick(index){
        this.tab.forEach(function (item, key) {
          if (index == key) {
            item.active = true;
          }
          else {
            item.active = false;
          }
        })
      }

    },
    mounted(){
      this.getList();
      this.getOrg()
    }
  }
</script>

<style lan="less" scoped>

  .page-content {
    margin-left: 200px;

  }

  .page-title {
    height: 50px;
    line-height: 50px;
    background: #fff;
    border-radius: 2px;
    margin-left: 15px;
    text-indent: 10px;
    color: #606266;
  }

  .ul-list {

  }

  .li-list {
    width: 50%;
    height: 40px;
    line-height: 40px;
    padding: 0 0 0 10px;
    list-style: none;
    box-sizing: border-box;
    color: #606266;
    background: #fff;
    cursor: pointer;
    border-radius: 2px;
    border-bottom: 1px solid #dedede;

  }

  .li-list:first-child {
    border-right: 1px solid #409eff
  }

  .li-list.active {
    background: #409eff;
    color: #fff;
    border-bottom-color: #409eff;

  }


</style>
