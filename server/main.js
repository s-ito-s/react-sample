const express = require('express') 
const uuid = require('uuid')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(3001, () => {
  console.log("Start on port 3001.")
})

const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

////////////////////////////////////////////////////
// Device
////////////////////////////////////////////////////

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

////////////////////////////////////////////////////
// User
////////////////////////////////////////////////////

function getRandomHiragana () {
  const hiragana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろ".split("");
  return hiragana[Math.floor(Math.random() * hiragana.length)]
}

function generateRandomName () {
  const kanji = ['山', '田', '川', '島', '花', '中', '林', '森', '木', '東', '西', '南', '北', '橋', '本', '藤']
  const char1 = kanji.splice(Math.floor(Math.random() * kanji.length), 1)
  const char2 = kanji.splice(Math.floor(Math.random() * kanji.length), 1) 
  const firstName = char1 + char2
  const lastName = getRandomHiragana() + getRandomHiragana() + [getRandomHiragana(), '太郎', '子', '太'][Math.floor(Math.random() * 4)]
  return firstName + ' ' + lastName
}

const users = []
for(let i = 0; 239 > i; ++i) {
  users.push({ 
    id: uuid.v4(), 
    name: generateRandomName(), 
    departmentId: String(Math.floor(Math.random() * 35))
  })
}

app.post('/user', (req, res) => {
  console.log('post : /user', req.body, req.query, req.params)
  const param = req.body
  const id = uuid.v4()
  const newUser = {
    id,
    name: param.name,
    departmentId: param.departmentId,
  }
  users.unshift(newUser)
  const response = {
    result: 'success',
    id,
  }
  res.send(JSON.stringify(response))
})

app.get('/users', (req, res) => {
  console.log('get : /users', req.body, req.query, req.params)
  const params = req.query
  const offset = Number(params.offset)
  const count = Number(params.count)

  let list = users
  if (params?.name) {
    list = list.filter((user) => {
      return user.name.match(params.name)
    })
  }
  if (params?.department) {
    list = list.filter((user) => {
      return user.departmentId === String(params.department)
    })
  }  
  const total = list.length

  list = list.filter((_, idx) => {
    return (offset <= idx) && (idx < offset + count)
  }).map((user) => {
    const departmentName = departments[user.departmentId].name
    return {
      id: user.id,
      name: user.name,
      departmentName,
      departmentId: user.departmentId
    }
  })

  res.send(JSON.stringify({offset, total, list}))
})

app.put('/user/:userId', (req, res) => {
  console.log('put : /user', req.body, req.query, req.params)
  const targetId = req.params.userId
  const params = req.body.params
  const idx = users.findIndex((user) => {
    return user.id === targetId
  })

  if (idx < 0) {
    res.status(400).send({ error: 'invalid id' });
    return
  }

  if (params?.name) {
    users[idx].name = params.name
  }
  if (params?.departmentId) {
    users[idx].departmentId = params.departmentId
  }
  const response = {
    result: 'success',
  }
  res.send(JSON.stringify(response))
})

app.delete('/user/:userId', (req, res) => {
  console.log('delete : /user', req.body, req.query, req.params)
  const targetId = req.params.userId
  const idx = users.findIndex(user => user.id === targetId)
  users.splice(idx, 1)
  const response = {
    result: 'success',
  }
  res.send(JSON.stringify(response))
})


////////////////////////////////////////////////////
// Department
////////////////////////////////////////////////////

const departments = []
const departmentNameList = ['営業', '人事', '開発', '総務', '経理', '法務', '情報システム']
let i = 0
for(const departmentName of departmentNameList) {
  for(let j = 1; 5 >= j; ++j) {
    departments.push({ 
      id : String(i),
      name: departmentName + '部 ' + j + '課',
    })
    ++i
  }
}

app.get('/departments', (req, res) => {
  console.log('get : /departments', req.body, req.query, req.params)
  const params = req.query
  const offset = Number(params.offset)
  const count = Number(params.count)

  let list = departments
  if (params?.searchWord) {
    list = list.filter((department) => {
      return department.name.match(params.searchWord)
    })
  }
  const total = list.length

  list = list.filter((_, idx) => {
    return (offset <= idx) && (idx < offset + count)
  })

  res.send(JSON.stringify({offset, total, list}))
})
