<div align="center">
<h1>時計 (名称未設定)</h1>
</div>


## 概要
時計ガジェットです。
ハイリア暦を表示できるアプリケーションが不思議なことに全く存在しなかったので、仕方なく自作しました。
もともと Groovy＋JavaFX で書かれていたものを、TypeScript＋Electron＋React に書き換えました。

曜日によって文字の色が変わります。

## 操作
**[→], [←]**:
モードを切り替えます。
[→] キーを押すと、グレゴリオ暦→ハイリア暦→ストップウォッチの順で切り換わります。
[←] キーを押すと、この逆順で切り換わります。  
**[↑], [↓]**:
24 時間制か 30 時間制かを切り替えます。
どちらのキーを押しても違いはありません。  
**[Space], [Enter]**:
ストップウォッチモードの場合のみ、ストップウォッチの開始もしくは停止を行います。
どちらのキーを押しても違いはありません。  
**[Backspace]**:
ストップウォッチモードの場合のみ、ストップウォッチをリセットします。  
**ドラッグ**:
ウィンドウを移動します。  
**[F5]**:
ウィンドウを初期位置 (スクリーンの右下) に移動します。