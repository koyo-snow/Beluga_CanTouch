# Beluga_CanTouch
シロイルカ（ベルーガ）を触っているように見えるようにしてみました。実行する際はローカルホストで行ってください。<br>
<br>
作り方<br>
1.<br>
GIMPを使って、画像の幅（または高さ）の長い方を800pxまで縮小します。<br>
大きすぎる画像だと後に記述するアニメーションがカクカクしてしまうため、データのサイズを減らします。<br>
<br>
2.<br>
GIMPを使って、触りたい部分以外の背景を透過します。<br>
触りたい部分が複数ある場合は、それぞれをトリミングして背景を透過します。<br>
周囲に余白ができるよう50pxほど大きめにトリミングすると良いでしょう。<br>
余白を作る理由は、後述の関数で触っていない場合に関数を画像を歪ませる処理をしないためです。<br>
このリポジトリの例で触りたいのはベルーガ一匹なので、トリミングはしていません。<br>
<br>
3.<br>
GIMPを使って、触れる部分のパス（ファイルやURLの意味のパスではなく、画像の輪郭などイラストで使われる意味のパス）を<br>
取得してエクスポートします。<br>
<br>
4.<br>
index.phpの編集をします。<br>
<div class="wrapper"><br>
  <img id="background" src="./images/background/Beluga.png" /><br>
        <br>
  <canvas id ="CanTouchBeluga" width="694" height="800"></canvas><br>
  <img id="CanTouchBelugaImage" src="./images/canTouch/CanTouchBeluga.png" alt=""><br>
</div><br>
の画像のパス（ファイルのパスの意味です）を入力し、canvasのwidthとheightを指定します。<br>
widthとheightはMacならプレビュー.appから取得すると良いでしょう。<br>
<br>
読み込むJavaScriptは全部で5つです。<br>
<script src="./js/glfx.js"></script><br>
<script src="./js/jquery.js"></script><br>
<script src="https://code.createjs.com/1.0.0/createjs.min.js"></script><br>
<script src="./js/main.js?<?php echo date('Ymd-His'); ?>"></script><br>
コードを編集した時にすぐにブラウザで反映されるよう、クエリ（?<?php ~ ?>）を用いています。
（このクエリを利用するためにphpを使用しました。）
glfx.jsは画像を歪ませる処理をしてくれるライブラリです。
jqueryは歪ませた画像を表示した後、最後に表示した画像以外の過去の歪ませた画像を削除するときに便利なため
使うことにしました。
createJSは画像の当たり判定を処理しています。エクスポートしたパスはこの当たり判定のために作りました。
main.jsは画像を歪ませる処理とカーソルと画像の当たり判定を処理するJavaScriptです。

5.
CSSはこのベルーガの例では<br>
.CanTouchBelugaImageClass {<br>
  position: absolute;<br>
  left: 0px;<br>
  top: 0px;<br>
  z-index: 1;<br>
}<br>
となっています。
このCanTouchBelugaImageClassは歪ませた画像に付随しているクラスとなっています。
これはmain.jsのsetCanvas_and_ReproTouchCanTouchBeluga（）関数でクラスを付加しています。<br>
z-index: 1;<br>
は背景よりも前、当たり判定よりも後ろに表示するための処理です。<br>
left: 0px;<br>
top: 0px;<br>
は触りたい画像で触りたい画像の位置を調整してください。<br>
画像の大きさはGIMPであらかじめ処理しているためさらに処理を加える必要はないはずです。<br>

6.
main.jsの27行目、28行目のx座標、y座標は触りたい画像の位置です。<br>
このベルーガの例では共に0としていますが、<br>
5.の<br>
left: 0px;<br>
top: 0px;<br>
と同じ値にすることで画像の位置を調整することができます。<br>
<br>
33行目で<br>
CanTouchBelugaShape.alpha = 0.01;<br>
としているのは、完全な透明だと当たり判定の処理をしなくなってしまうためです。<br>
<br>
38行目〜79行目でGIMPでエクスポートしたパス(3.)を入力しています。<br>
このパスが当たり判定の範囲となります。<br>
<br>
84行目でフレームレートを指定しています。<br>
カクカクしないようご自身で調整してください。<br>
<br>
参考リンク： https://ics.media/tutorial-createjs/ticker/
<br>
7.<br>
main.jsのsetCanvas_and_ReproTouchCanTouchBeluga()関数の<br>
130行目で歪ませた後の画像を表示する座標を指定します。<br>
ここでは共に0としていますが、表示させたい画像の場所を調整することができます。<br>
70は歪ませる範囲の半径、0.28はどのぐらい強く歪ませるかの値です。<br>
<br>
参考リンク： https://evanw.github.io/glfx.js/docs/
<br>
これで終了です。<br>
<br>




