var gulp=require("gulp"),
    browserSync=require('browser-sync').create();
    plugins=require("gulp-load-plugins")();

// 编译sass
gulp.task("sass",function(){
    gulp.src(["bulid/sass/*.scss","!bulid/sass/_*.scss"])
    .pipe(plugins.sass({
        includePaths:"./bower_components/bootstrap-sass/assets/stylesheets"
    }).on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({
        browsers:['last 2 versions', 'ie 8-11', 'Firefox ESR'],
        cascade:true,
        remove:true
    }))
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.reload({ stream: true }));
});

//编译js
 gulp.task("js",function(){
    gulp.src("bulid/js/*.js")
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter())
    .pipe(gulp.dest("public/js"))
    .pipe(browserSync.reload({ stream: true }));
 });

//启动服务
gulp.task("serve",["sass","js"],function(){
    browserSync.init({
        server:{
            baseDir:"./"
        }
    });
    gulp.watch("bulid/sass/*.scss",['sass']);
    gulp.watch("bulic/js/*js",["js"])
    gulp.watch(["*.html"]).on("change",browserSync.reload);

});