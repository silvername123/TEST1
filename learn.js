// Observer pattern
class Observer {
  constructor(id) {
    this.id = id
  }
  get(task) {
    console.log('menu get task', task)
  }
  update(task) {
    console.log('menu update')
    this.get(task)
  }
}

class Subject {
  constructor() {
    this.list = []
  }
  addObserver(observer) {
    this.list.push(observer)
  }
  notify(task) {
    console.log('发布任务', task)
    this.list.forEach((item) => {
      item.update(task)
    })
  }
}
const sub = new Subject()
const o1 = new Observer('小米')
const o2 = new Observer('小明')

sub.addObserver(o1)
sub.addObserver(o2)

sub.notify('任务1')

sub.notify('任务2')

// publish-subscribe pattern

class PubSub {
  constructor() {
    this.tasklist = new Map()
  }
  subscribe(taskName, callback) {
    if (!this.tasklist.has(taskName)) {
      this.tasklist.set(taskName, [])
    }
    this.tasklist.get(taskName).push(callback)
  }

  publish(taskName, ...data) {
    if (this.tasklist.has(taskName)) {
      this.tasklist.get(taskName).forEach((callback) => {
        callback(...data)
      })
    }
  }
  unpublishAll(taskName) {
    if (this.tasklist.get(taskName)) {
      delete this.tasklist.get(taskName)
    }
  }
  unpublish(taskName) {
    if (this.tasklist.get(taskName)) {
      this.tasklist.delete(taskName)
    }
  }
}
