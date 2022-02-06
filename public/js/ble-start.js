function onClick() {
	// １．BLEデバイスをスキャンする
	navigator.bluetooth.requestDevice({
		acceptAllDevices: true, // 全てのデバイスを対象にスキャンを実施する
		optionalServices: ['0000ffe0-0000-1000-8000-00805f9b34fb'] // 利用するServiceのUniform Type Identifierを予め指定する
	}).then(device => {
		// ２．デバイスに接続
		console.log('2. device', device);
		return device.gatt.connect();
	}).then(server =>{
		// ３-1．「Service」を指定, ServiceのUniform Type Identifierを指定
		console.log('31. service', server);
		return server.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb');
	}).then(service =>{
		// ３-2．「Characteristc」を指定, CharacteristcのUniform Type Identifierを指定
		console.log('32. service', service);
		return service.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb');
	}).then((characteristic)  => {
		//４．受信準備を行う
		console.log('4. characteristic', characteristic);
		return characteristic.startNotifications().then(char => {
			//５．受信したバイナリを解析、処理の実施
			characteristic.addEventListener('characteristicvaluechanged', (event) => {
				// 「event.target.value」がDataView型で渡ってくるのでこれを解析
				console.log('5. event', event)
			});
		});
	});
}