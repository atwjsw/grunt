(function (a,b) {
	function add(a,b) {
		a = a + b;	//c未定义
		return a+b; 	//未写分号
	}
	add(10, 100); //未写分号
})(window);