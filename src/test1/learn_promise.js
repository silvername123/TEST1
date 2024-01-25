// var request = require('request');

// 先定义三个常量表示状态
var PENDING = 'pending'
var FULFILLED = 'fulfilled'
var REJECTED = 'rejected'

// 不进行then返回的promise判读的问题
// var p2 = p.then((data) => {
//   // 循环引用，自己等待自己完成，一辈子完不成
//   return new Promise((resolve, reject) => {
//     resolve('1')
//   })
// })
function t1(resolve, reject) {
  setTimeout(() => {
    resolve('success')
  }, 1000)
}
function t2(resolve, reject) {
  setTimeout(() => {
    reject('fail')
  }, 1000)
}
function t3(resolve, reject) {
  setTimeout(() => {
    resolve('success1')
  }, 1000)
}
const pro = new Promise((resolve, reject) => {
  resolve('success')
  reject('fail')
})
// 不是函数，直接返回
pro.then((result) => console.log(result)).catch((e) => console.log(e))
// 是函数执行就行
const pro1 = new Promise((resolve, reject) => {
  t1(resolve, reject)
})
pro1.then(() => console.log('use'))
class MyTestPromise {
  constructor(fun) {
    this.status = PENDING
    this.result = null
    this.reason = null
    try {
      fun(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
    this.resolveCallBacks = []
    this.rejectCallBacks = []
  }
  resolve(fn) {
    setTimeout(() => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.result = fn
        this.resolveCallBacks.forEach((callback) => {
          callback(this.result)
        })
      }
    })
  }
  reject(fn) {
    setTimeout(() => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = fn
        this.rejectCallBacks.forEach((callback) => {
          callback(this.reason)
        })
      }
    })
  }
  then(onFulfilled, onRejected) {
    let nextPromise = new MyTestPromise((resolve, reject) => {
      onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
      onRejected =
        typeof onRejected === 'function'
          ? onRejected
          : (e) => {
              throw e
            }
      if (this.status === PENDING) {
        // resolve(...args)
        setTimeout(() => {
          this.rejectCallBacks.push(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(nextPromise, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
        setTimeout(() => {
          this.resolveCallBacks.push(() => {
            try {
              let x = onFulfilled(this.result)
              resolvePromise(nextPromise, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
      }
      if (this.status === FULFILLED) {
        setTimeout(() => {
          let x = onFulfilled(this.result)
          resolvePromise(nextPromise, x, resolve, reject)
        })
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          let x = onRejected(this.reason)
          resolvePromise(nextPromise, x, resolve, reject)
        })
      }
    })
    return nextPromise
  }
  catch(fn) {
    return this.then(null, fn)
  }
}

function resolvePromise(promise, x, resolve, reject) {
  // 不能自己等于自己 引发循环套用
  if (promise === x) {
    return reject(new TypeError('The promise and the return value are the same'))
  }
  let called
  // x不是null x是对象或者函数
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then
      // 关键的链式调用操作
      if (typeof then === 'function') {
        // 第一个参数为指向 x的this  第二个参数为成功回调  第三个参数为失败回调
        then.call(
          x,
          (y) => {
            if (called) return
            called = true
            resolvePromise(promise, y, resolve, reject)
          },
          (r) => {
            if (called) return
            called = true
            reject(r)
          }
        )
      }
    } catch (error) {
      if (called) return
      called = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}
console.log('1')
var p3 = new MyTestPromise((res) => {
  console.log('2')
  setTimeout(() => {
    res('结果')
    console.log('4')
  })
})
p3.then(() => {
  // 直接抛就行
  throw new Error('MDA')
}).catch((e) => console.log(e))
console.log('3')
