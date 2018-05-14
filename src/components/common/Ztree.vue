<template>
  <ul id="ztree" class="ztree"></ul>

</template>
<script>
  import "../../plugins/zTree/zTreeStyle/zTreeStyle.css"
  import "../../plugins/zTree/jquery-1.4.4.min.js"
  import "../../plugins/zTree/jquery.ztree.core.min.js"
  import "../../plugins/zTree/jquery.ztree.exhide.min.js"

  export default{
    name: 'ElZtree',
    props: {
      treeData: {
        type: Array,
        required: true
      },
      settings: {
        type: Object,
        default: {
          data: {
            simpleData: {
              enable: true,
              idKey: "id",
              pIdKey: "pid"
            },
            key: {
              name: 'name'
            }
          },
          callback: {
            onClick: function (event, treeId, treeNode) {

            }
          }
        }
      }
    },
    data(){
      return {}
    },
    methods: {},
    mounted(){
      $.fn.zTree.init($("#ztree"), this.settings, this.treeData).expandAll(true)
    },
    watch: {
      treeData: function (newValue, oldValue) {
        $.fn.zTree.init($("#ztree"), this.settings, newValue).expandAll(true)
      }
    },

  }


</script>
