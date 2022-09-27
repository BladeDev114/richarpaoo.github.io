class CrossLine {
  constructor() {
    this.root = document.body
    this.cursor = document.querySelector(".curzr")
    this.verLine = document.querySelector(".curzr .line-v")
    this.horLine = document.querySelector(".curzr .line-h")
    // For Triangle
    this.triangle = document.querySelector(".triangle")
    this.triangleShadow = document.querySelector(".triangle-shadow")

    this.distanceX = 0 
    this.distanceY = 0
    this.pointerX = 0
    this.pointerY = 0
    this.previousPointerX = 0
    this.previousPointerY = 0
    this.cursorSize = 100
    this.moving = false

    this.cursorStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      top: `${ this.cursorSize / -2 }px`,
      left: `${ this.cursorSize / -2 }px`,
      zIndex: '2147483647',
      width: `${ this.cursorSize }px`,
      height: `${ this.cursorSize }px`,
      borderRadius: '50%',
      overflow: 'visible',
      transition: '200ms, transform 100ms',
      userSelect: 'none',
      pointerEvents: 'none'
    }

    this.init(this.cursor, this.cursorStyle)
  }

  init(el, style) {
    Object.assign(el.style, style)
    this.cursor.removeAttribute("hidden")
    
  }

  move(event) {
    this.previousPointerX = this.pointerX
    this.previousPointerY = this.pointerY
    this.pointerX = event.pageX + this.root.getBoundingClientRect().x
    this.pointerY = event.pageY + this.root.getBoundingClientRect().y
    this.distanceX = (this.previousPointerX - this.pointerX) / 1.5
    this.distanceY = (this.previousPointerY - this.pointerY) / 1.5
    
    this.verLine.setAttribute('y1', Math.min(40, (40 + this.distanceY)))
    this.verLine.setAttribute('y2', Math.max(60, (60 + this.distanceY)))
    this.horLine.setAttribute('x1', Math.min(40, (40 + this.distanceX)))
    this.horLine.setAttribute('x2', Math.max(60, (60 + this.distanceX)))

    this.cursor.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`
    this.triangleShadow.style.transform = `translate3d(${this.pointerX / (window.innerWidth / 40)}px, ${this.pointerY / (window.innerWidth / 40)}px, 0)`
    this.triangle.style.transform = `translate3d(${this.pointerX / (window.innerWidth / 20)}px, ${this.pointerY / (window.innerWidth / 20)}px, 0)`

    if (event.target.localName === 'img' || 
        event.target.localName === 'polygon' ||
        event.target.onclick !== null ||
        Array.from(event.target.classList).includes('curzr-hover')) {
      this.hover()
    }
    
    this.moving ? this.stop() : this.moving = true
  }

  hover() {
    this.cursor.style.transform += ` rotate(45deg)`
  }
  
  stop() {
    setTimeout(() => {
      this.verLine.setAttribute('y1', 40)
      this.verLine.setAttribute('y2', 60)
      this.horLine.setAttribute('x1', 40)
      this.horLine.setAttribute('x2', 60)
      this.moving = false
    }, 50)
  }
}

(() => {
  const cursor = new CrossLine()
  document.onmousemove = function (event) {
    cursor.move(event)
  }
  document.ontouchmove = function (event) {
    cursor.move(event.touches[0])
  }
})()

JsBarcode(".barcode", "01", {
  lineColor: "#1a1a1a",
  width: 2,
  height: 20,
  displayValue: false
})