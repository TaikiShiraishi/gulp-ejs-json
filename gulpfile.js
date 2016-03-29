var fs = require('fs');
var gulp = require('gulp');
var ejs = require('gulp-ejs');
var rename = require('gulp-rename');

gulp.task('json-html', function() {
    var json_file = "./src/json/pages.json"; // 設定用JSONファイル
    var tmp_file = "./src/ejs/template.ejs"; // テンプレート用EJSファイル

    var json = JSON.parse(fs.readFileSync(json_file)); // JSONの読み込み
    var pages = json.pages;
    var common = json.common;

    for (var i = 0; i < pages.length; i++) { // ページの数だけループ
        var id = pages[i].id;

        gulp.src(tmp_file)
            .pipe(ejs({
                jsonData: pages[i], // JSONのデータをejsに渡す
                commonData: common // JSONのデータをejsに渡す
            }))
            .pipe(rename(id + ".html")) // (id).htmlにファイル名を変更
            .pipe(gulp.dest("dist")); // 指定したフォルダに出力
    }
});
