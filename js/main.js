{
  ("use strict");

  // マウスの座標を取得する。
  let mouseX = 0, //マウスのX座標
    mouseY = 0; //マウスのY座標

  $(document).on("mousemove", function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  window.addEventListener("load", init);

  function init() {
    ////// Beluga CanTouch
    // Stageオブジェクトの作成。表示リストのルートになる。
    let stageCanTouchBeluga = new createjs.Stage("CanTouchBeluga");

    // マウスオーバーを有効にする。
    stageCanTouchBeluga.enableMouseOver();

    // 触れるベルーガの画像を表示する。
    let CanTouchBelugaBitmap = new createjs.Bitmap("./images/canTouch/CanTouchBeluga.png");
    stageCanTouchBeluga.addChild(CanTouchBelugaBitmap);

    CanTouchBelugaBitmap.x = 0;
    CanTouchBelugaBitmap.y = 0;

    stageCanTouchBeluga.update();

    let CanTouchBelugaShape = new createjs.Shape();
    CanTouchBelugaShape.alpha = 0.01;
    ////// 輪郭確認用
    // CanTouchBelugaShape.alpha = 1;
    CanTouchBelugaShape.graphics.beginFill("#ffffff");

    CanTouchBelugaShape.graphics.moveTo(122.00, 90.00);
    CanTouchBelugaShape.graphics.lineTo(88.00, 101.00);
    CanTouchBelugaShape.graphics.lineTo(72.00, 118.00);
    CanTouchBelugaShape.graphics.lineTo(67.00, 135.00);
    CanTouchBelugaShape.graphics.lineTo(69.00, 159.00);
    CanTouchBelugaShape.graphics.lineTo(74.00, 187.00);
    CanTouchBelugaShape.graphics.lineTo(80.00, 215.00);
    CanTouchBelugaShape.graphics.lineTo(87.00, 253.00);
    CanTouchBelugaShape.graphics.lineTo(90.00, 295.00);
    CanTouchBelugaShape.graphics.lineTo(92.00, 344.00);
    CanTouchBelugaShape.graphics.lineTo(97.00, 384.00);
    CanTouchBelugaShape.graphics.lineTo(113.00, 447.00);
    CanTouchBelugaShape.graphics.lineTo(127.00, 505.00);
    CanTouchBelugaShape.graphics.lineTo(129.00, 520.00);
    CanTouchBelugaShape.graphics.lineTo(129.00, 553.00);
    CanTouchBelugaShape.graphics.lineTo(116.00, 605.00);
    CanTouchBelugaShape.graphics.lineTo(100.00, 663.00);
    CanTouchBelugaShape.graphics.lineTo(82.00, 713.00);
    CanTouchBelugaShape.graphics.lineTo(47.00, 798.00);
    CanTouchBelugaShape.graphics.lineTo(674.00, 799.00);
    CanTouchBelugaShape.graphics.lineTo(636.00, 711.00);
    CanTouchBelugaShape.graphics.lineTo(612.00, 662.00);
    CanTouchBelugaShape.graphics.lineTo(592.00, 621.00);
    CanTouchBelugaShape.graphics.lineTo(570.00, 584.00);
    CanTouchBelugaShape.graphics.lineTo(549.00, 548.00);
    CanTouchBelugaShape.graphics.lineTo(529.00, 517.00);
    CanTouchBelugaShape.graphics.lineTo(508.00, 478.00);
    CanTouchBelugaShape.graphics.lineTo(496.00, 447.00);
    CanTouchBelugaShape.graphics.lineTo(482.00, 418.00);
    CanTouchBelugaShape.graphics.lineTo(466.00, 372.00);
    CanTouchBelugaShape.graphics.lineTo(451.00, 334.00);
    CanTouchBelugaShape.graphics.lineTo(434.00, 290.00);
    CanTouchBelugaShape.graphics.lineTo(406.00, 240.00);
    CanTouchBelugaShape.graphics.lineTo(366.00, 167.00);
    CanTouchBelugaShape.graphics.lineTo(337.00, 124.00);
    CanTouchBelugaShape.graphics.lineTo(305.00, 88.00);
    CanTouchBelugaShape.graphics.lineTo(275.00, 65.00);
    CanTouchBelugaShape.graphics.lineTo(247.00, 52.00);
    CanTouchBelugaShape.graphics.lineTo(214.00, 46.00);
    CanTouchBelugaShape.graphics.lineTo(185.00, 49.00);
    CanTouchBelugaShape.graphics.lineTo(158.00, 63.00);
    CanTouchBelugaShape.graphics.lineTo(122.00, 90.00);

    stageCanTouchBeluga.addChild(CanTouchBelugaShape);

    // フレームレート。
    createjs.Ticker.framerate = 30;

    createjs.Ticker.addEventListener("tick", handleTick);

    function handleTick() {
      // 触れるベルーガから見た相対座標に変換する。
      let pointCanTouchBeluga = CanTouchBelugaShape.globalToLocal(stageCanTouchBeluga.mouseX, stageCanTouchBeluga.mouseY);

      // 触れるベルーガとカーソルが当たっているかを調べる
      let isHitCanTouchBeluga = CanTouchBelugaShape.hitTest(pointCanTouchBeluga.x, pointCanTouchBeluga.y);

      // 当たっていれば
      if (isHitCanTouchBeluga === true) {
        setCanvas_and_ReproTouchCanTouchBeluga();
      }

      if (isHitCanTouchBeluga === true) {
        document.body.style.cursor = "grab";
      } else {
        document.body.style.cursor = "pointer";
      }

      // Stageの描画を更新する。
      stageCanTouchBeluga.update();
    }
    // Stageの描画を更新する。
    stageCanTouchBeluga.update();
  }

  function setCanvas_and_ReproTouchCanTouchBeluga() {
    console.log("touch CanTouchBeluga");

    try {
      var canvas_CanTouchBeluga = fx.canvas();
      canvas_CanTouchBeluga.classList.add("CanTouchBelugaImageClass");
    } catch (err) {
      alert(err);
      return;
    }

    let Image_CanTouchBeluga = document.getElementById("CanTouchBelugaImage");

    let texture_CanTouchBeluga = canvas_CanTouchBeluga.texture(Image_CanTouchBeluga);

    canvas_CanTouchBeluga
      .draw(texture_CanTouchBeluga)
      .bulgePinch(mouseX - 0, mouseY - 0, 70, 0.28)
      .update();

    Image_CanTouchBeluga.parentNode.insertBefore(canvas_CanTouchBeluga, Image_CanTouchBeluga);

    $(".CanTouchBelugaImageClass:not(:last)").remove();

    return false;
  }
}