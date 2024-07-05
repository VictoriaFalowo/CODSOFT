class Calculator{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.clear()
    }

    clear(){
        this.previousOperation = ''
        this.currentOperation = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperation = this.currentOperation.toString().slice(0, -1)
     }

    appendNumber(number){
    if (number === '.' && this.currentOperation.includes('.')) return
    this.currentOperation = this.currentOperation.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperation =='')return
        if(this.previousOperation !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperation = this.currentOperation
        this.currentOperation = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperation) 
        const current = parseFloat(this.currentOperation)
        if (isNaN(prev) || isNaN(current))return 
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '÷':
                computation = prev / current
                break
             case '×':
                computation = prev * current
                break
            default:
                return
        }
        this.currentOperation = computation
        this.operation = undefined
        this.previousOperation = ''
    }

    getDisplayNumber(number){
        return number
    }

    updateDisplay(){
       this.currentOperationText.innerText = this.getDisplayNumber(this.currentOperation)  
       if (this.operation != null) {
        this.previousOperationText.innerText = 
        `${this.getDisplayNumber(this.previousOperation)} ${this.operation}`
       }else{
        this.previousOperationText.innerText = ''
       }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const previousOperationText = document.querySelector('[data-previous]')
const currentOperationText = document.querySelector('[data-current]')

const calculator = new Calculator(previousOperationText, currentOperationText)

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)  
      calculator.updateDisplay()
    })
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)  
      calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
