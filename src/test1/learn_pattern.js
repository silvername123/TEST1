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
console.log('1')
const sub = new Subject()
const o1 = new Observer('小米')
const o2 = new Observer('小明')

sub.addObserver(o1)
sub.addObserver(o2)

sub.notify('任务1')

sub.notify('任务2')
