var gulp=require("gulp");
var uglify=require("gulp-uglify");//压缩文件gulp-uglify
var minifyhtml=require("gulp-htmlmin");
var mincss=require("gulp-minify-css");
var url=require("url");
var sass=require("gulp-sass");
var concat=require("gulp-concat");
var imgmins=require('gulp-imagemin');
var webserver=require("gulp-webserver");
var data=require("./data/data.js");
var rev=require("gulp-rev"); //md5加密
var replaceRev=require("gulp-rev-collector");//动态替换html内静态资源名
var browserify = require('gulp-browserify');
var connect=require("gulp-connect");
//压缩文件
gulp.task("ys",function(){
	gulp.src("src/js/a.js")
  .pipe(browserify({
        insertGlobals : true,
        debug : !gulp.env.production
      }))
  .pipe(rev())
	.pipe(uglify())
	.pipe(gulp.dest("bound/js"))
  .pipe(rev.manifest())
  .pipe(gulp.dest("./rev/js"))
})

//压缩html


gulp.task("minhtml",function(){
	gulp.src("src/html/*.html")
	//.pipe(minifyhtml({collapseWhitespace:true}))
	.pipe(gulp.dest("bound/html"))
})


//压缩css

gulp.task("mincss",function(){
	gulp.src("src/css/*.css")
 
  //.pipe(sass())//编译sass
  .pipe(rev())
	.pipe(mincss())
	.pipe(gulp.dest("bound/css"))
  .pipe(rev.manifest())
  .pipe(gulp.dest("./rev/css"))
})


//编译sass

// gulp.task("sass",function(){
// 	return gulp.src('src/css/*.sass')
    
//     .pipe(gulp.dest('./css'));
// })


//合并

gulp.task("concat",function(){
	gulp.src("src/js/*.js")
	.pipe(concat("common.js"))
	.pipe(uglify())
	.pipe(gulp.dest("bound/js"))
})


//压缩图片

gulp.task("imgmin",function(){
	gulp.src("src/img/*.jpg")
	.pipe(imgmins())
	.pipe(gulp.dest("bound/img"))
})


//热启动

gulp.task("server",["replaceRev"],function(){


	gulp.watch("src/html/*.html",["minhtml"])
	gulp.watch("src/css/*.css",["mincss"])
	gulp.watch("src/js/*.js",["ys"])
	 gulp.src('./bound')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      port:8001,
      // middleware:function(req,res,next){
      // 	//var pathname=url.parse(req.url).pathname;
      // 	// data.forEach(function(i){
      // 	// 	switch(i.route){
      // 	// 		case pathname:{
      // 	// 			i.handle(req,res,next,url)
      // 	// 		}
      // 	// 	}
      // 	// })
      //   res.writeHead(200,{"content-Type":"application/json"})
      //   //res.write(JSON.stringify(data))
      //   res.end()
      // },
      open:'html/index.html'
    }));
})


gulp.task("replaceRev",["mincss","ys"],function(){
    setTimeout(function(){
      gulp.src(["./rev/**/*.json","./src/html/*.html"])
      .pipe(replaceRev({
                replaceReved: true,
                dirReplacements: {
                    'css': 'css/',
                    'js': 'js/',
                    // 'cdn/': function(manifest_value) {
                    //     return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                    // }
                }
            })) 
      //.pipe(replaceRev())
      .pipe(gulp.dest("./bound/html"))
    },3000)
})







