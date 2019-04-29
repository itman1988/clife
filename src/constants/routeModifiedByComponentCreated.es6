// 定义一个混入对象
export var ModuleModified = {
  created: function () {
    var currentPath = this.$route.matched[0].path.substr(1);
    this.$emit("moduleSwitcher", {
      path: currentPath
    });
  },
  methods: {
    //
  }
};
export var RouteModified = {
  created: function () {
    var path = this.$route.matched[1].path;
    var index = path.lastIndexOf('/') + 1;
    var currentPath = path.substr(index);
    this.$emit("routeSwitcher", {
      path: currentPath
    });
  },
  methods: {
    //
  }
};
