const express = require('express') 
const uuid = require('uuid')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(3001, () => {
  console.log("Start on port 3001.")
})

const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const devices = [
  { id: uuid.v4(), name: "device1", model: "cc2" },
  { id: uuid.v4(), name: "device2", model: "cc2" },
  { id: uuid.v4(), name: "device3", model: "cc2-l" },
  { id: uuid.v4(), name: "device4", model: "safie-one" },
  { id: uuid.v4(), name: "device5", model: "safie-one" },
  { id: uuid.v4(), name: "device6", model: "cc2-l" },
  { id: uuid.v4(), name: "device7", model: "cc2" },
  { id: uuid.v4(), name: "device8", model: "safie-one" },
  { id: uuid.v4(), name: "device9", model: "cc2" },
]

app.get('/devices', (req, res) => {
  console.log('get : /devieces', req.body, req.query, req.params)
  const params = req.query
  let response = devices.map(device => device)
  if (params?.name) {
    response = response.filter((device) => {
      return device.name.match(params.name)
    })
  }
  if (params?.model) {
    response = response.filter((device) => {
      return device.model.match(params.model)
    })
  }  
  res.send(JSON.stringify(response))
})

app.get('/delay/devices', async (req, res) => {
  console.log('get : /delay/devieces', req.body, req.query, req.params);
  const params = req.query;
  let response = devices.map((device) => device);
  if (params?.name) {
    response = response.filter((device) => {
      return device.name.match(params.name);
    });
  }
  if (params?.model) {
    response = response.filter((device) => {
      return device.model.match(params.model);
    });
  }
  await _sleep(3000);
  res.send(JSON.stringify(response));
});

app.post('/device', (req, res) => {
  console.log('post : /device', req.body, req.query, req.params)
  const param = req.body
  const id = uuid.v4()
  const newDevice = {
    id,
    name: param.name,
    model: param.model,
  }
  devices.push(newDevice)
  const response = {
    result: 'success',
    id,
  }
  res.send(JSON.stringify(response))
})

app.post('/delay/device', async (req, res) => {
  console.log('post : /delay/device', req.body, req.query, req.params)
  await _sleep(3000);
  const param = req.body
  const id = uuid.v4()
  const newDevice = {
    id,
    name: param.name,
    model: param.model,
  }
  devices.push(newDevice)
  const response = {
    result: 'success',
    id,
  }
  res.send(JSON.stringify(response))
})

app.put('/device/:deviceId', (req, res) => {
  console.log('put : /device', req.body, req.query, req.params)
  const targetId = req.params.deviceId
  const params = req.body.params
  const idx = devices.findIndex(device => device.id === targetId)
  if (params?.name) {
    devices[idx].name = params.name
  }
  if (params?.model) {
    devices[idx].model = params.model
  }
  const response = {
    result: 'success',
  }
  res.send(JSON.stringify(response))
})


app.put('/delay/device/:deviceId', async (req, res) => {
  console.log('put : /delay/device', req.body, req.query, req.params)
  console.log(req.body)
  const targetId = req.params.deviceId
  const params = req.body
  const idx = devices.findIndex(device => device.id === targetId)
  await _sleep(3000);
  if (params?.name) {
    devices[idx].name = params.name
  }
  if (params?.model) {
    devices[idx].model = params.model
  }
  const response = {
    result: 'success',
  }
  console.log(devices)
  res.send(JSON.stringify(response))
})

app.delete('/device/:deviceId', (req, res) => {
  console.log('delete : /device', req.body, req.query, req.params)
  const targetId = req.params.deviceId
  const idx = devices.findIndex(device => device.id === targetId)
  devices.splice(idx, 1)
  const response = {
    result: 'success',
  }
  res.send(JSON.stringify(response))
})

app.delete('/delay/device/:deviceId', async (req, res) => {
  console.log('delete : /device', req.body, req.query, req.params)
  await _sleep(3000);
  const targetId = req.params.deviceId
  const idx = devices.findIndex(device => device.id === targetId)
  devices.splice(idx, 1)
  const response = {
    result: 'success',
  }
  res.send(JSON.stringify(response))
})
