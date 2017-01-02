module.exports = function(grunt) {
    //任务配置，所有插件的配置信息
    grunt.initConfig({
        //获取package.json的信息
        pkg: grunt.file.readJSON('package.json'),

        //uglify插件的配置信息，banner+文件版本名
        uglify: {
        	options: {
        		stripBanners: true,
        		// options”中规定允许生成的压缩文件带banner，即在生成的压缩文件第一行加一句话说明。注意，其中使用到了pkg获取package.json的内容
        		banner: '/*! <%=pkg.name%>-<%pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        	},
        	build: {
        		src: 'src/test.js',
        		dest: 'build/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
        	}
        },
        //jshint插件配置信息, 指向.jshintrc
        jshint: {
        	// build”中描述了jshint要检查哪些js文档的语法。
        	//build: ['Gruntfile.js', 'src/*.js'],
        	//把“build”指向的内容分开来写。这样对多人协同开发很友好
        	test1: ['Gruntfile.js'],
        	test2: ['src/*.js'],
        	// “options”中描述了要通过怎么的规则检查语法，
        	// 这些规则的描述文件就保存在网站根目录下的一个叫做“.jshintrc”的文件中
        	options: {
        		jshintrc: '.jshintrc'
        	}
        },
        //watch插件配置
        watch: {
        	//watch将监控src文件夹下所有js文件和css文件的变化，一旦变化，则立即执行jshint和uglify两个插件功能
        	build: {
        		files: ['src/*.js', 'src/*.css'],
        		tasks: ['jshint', 'uglify'],
        		options: {spawn: false}
        	}
        }
    });

    //告诉grunt我们将使用哪些插件,grunt进行加载
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //告诉grunt当我们在终端中输入grunt时需要做些什么（注意先后顺序）
    grunt.registerTask('default', ['jshint','uglify', 'watch']);
};
