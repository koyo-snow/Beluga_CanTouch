<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="シロイルカ（ベルーガ）を触っているように見えるようにしてみました。">
  <meta charset="utf-8">
  <link rel="stylesheet" href="./css/style.css?ver<?php echo date('Ymd-His'); ?>">

  <title>Animal_Touch</title>
</head>

<body>
  <div id="container">

    <div class="wrapper">
      <img id="background" src="./images/background/Beluga.png" />
      
      <canvas id ="CanTouchBeluga" width="694" height="800"></canvas>
      <img id="CanTouchBelugaImage" src="./images/canTouch/CanTouchBeluga.png" alt="">
    </div>
  </div>

  <script src="./js/glfx.js"></script>
  <script src="./js/jquery.js"></script>
  <script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
  <script src="./js/main1.js?<?php echo date('Ymd-His'); ?>"></script>
</html>