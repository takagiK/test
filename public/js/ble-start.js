let UUID = '51C3509C-94AE-8E45-03DE-F56D7E3DDFC6'
let server = await this.ble_device.gatt.connect()
console.log('Execute : getPrimaryServices');
let services = await server.getPrimaryServices(UUID);
console.log(services);