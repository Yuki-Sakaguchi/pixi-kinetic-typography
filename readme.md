# PIXI.js でインタラクティブなタイポグラフィのアニメーションを作る
- https://yuki-sakaguchi.github.io/pixi-kinetic-typography/sample01
- https://yuki-sakaguchi.github.io/pixi-kinetic-typography/sample02

https://user-images.githubusercontent.com/16290220/151664029-e0746626-b7f4-488c-9583-0b6bc1d24e4f.mov

## やったこと
- PIXI.jsでテキストを画像に変換
- 変換した画像を元にテキストの形にパーティクルを配置
- マウスが近づくとパーティクルに運動エネルギーを与えてアニメーションするようにした
- 上からblurや境目をぼやかせるフィルター（一部シェーダー）を重ねてアニメーションを馴染ませた（これがないとパーティクル感が強まる）

## やれそうなこと
- 色とかテキストを動的に受け取るようにすればよりインタラクティブになりそう
- 色は時間とかで動的に変えていっても面白そう
- パーティクルの粒度をいじればパーティクルで描画されているテキスト感を強くできそう
- いろいろな値をいじればいろいろなアニメーションを表現できそう

## 参考
https://www.youtube.com/watch?v=HMQ9fEX28fk

前回の parcel　のやつが使いやすかったらそっちのやり方で書き直したい感はある
https://github.com/Yuki-Sakaguchi/pixi-golden-spiral
