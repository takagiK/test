// 情報元： https://shimz.me/blog/microbit/5456
var bluetoothDevice;
var characteristic;
//micro:bit BLE UUID
var LED_SERVICE_UUID                        = '51C3509C-94AE-8E45-03DE-F56D7E3DDFC6';
var LED_TEXT_CHARACTERISTIC_UUID            = 'FFE1';

//ボタンイベントリスナー
d3.select("#connect").on("click", connect);
d3.select("#disconnect").on("click", disconnect);
d3.select("#send").on("click", sendMessage);

//micro:bitに接続する
function connect() {
  let options = {};

  //options.acceptAllDevices = true;
  options.filters = [
    {services: [LED_SERVICE_UUID]},
    {namePrefix: "BBC micro:bit"}
  ];

  navigator.bluetooth.requestDevice(options)
  .then(device => {
    bluetoothDevice = device;
    console.log("device", device);
    return device.gatt.connect();
  })
  .then(server =>{
    console.log("server", server)
    return server.getPrimaryService(LED_SERVICE_UUID);
  })
  .then(service => {
    console.log("service", service)
    return service.getCharacteristic(LED_TEXT_CHARACTERISTIC_UUID)
  })
  .then(chara => {
    console.log("characteristic", chara)
    alert("BLE接続が完了しました。");
    characteristic = chara;
  })
  .catch(error => {
    console.log(error);
  });
}

//LEDに表示するメッセージを送信
function sendMessage() {
  if (!bluetoothDevice || !bluetoothDevice.gatt.connected || !characteristic) return ;
  var text = document.querySelector("#message").value;
  var arrayBuffe = new TextEncoder().encode(text);
  characteristic.writeValue(arrayBuffe);
}

//BLE切断処理
function disconnect() {
  if (!bluetoothDevice || !bluetoothDevice.gatt.connected) return ;
  bluetoothDevice.gatt.disconnect();
  alert("BLE接続を切断しました。")
}