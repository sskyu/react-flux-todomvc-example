export default class Hello {
  constructor(message = '') {
    this.message = message
  }

  say() {
    console.log(this.message)
  }

  later() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000)
    })
  }
}
