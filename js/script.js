const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

/* constructor para iniciar com valores padrão. Objetos únicos. Parâmetros para trabalhar com propriedades do objeto sem usar o DOM e Objetos ao mesmo tempo. 
CurrentOperation para situar o que o usuário está digitando 
*/
class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText
    this.currentOperationText = currentOperationText
    this.currentOperation = ""
  }
  /* add digit para tela da calculadora */
  addDigit(digit) {
    /* verificando se já tem ponto  */
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return
    }
    this.currentOperation = digit
    this.updateScreen()
  }
  /* - - - - OPERAÇÕES DA CALCULADORA - - - -  */
  processOperation(operation) {

    /* verificando se valor atual é vazio */
    if (this.currentOperationText.innerText === "" && operation !== "C") {
        /* mudar operação */
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation)
      }
      return
    }

    /* pegar valor atual e anterior */
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0]
    const current = +this.currentOperationText.innerText

    switch (operation) {
      case "+":
        operationValue = previous + current
        this.updateScreen(operationValue, operation, current, previous)
        break;
      case "-":
        operationValue = previous - current
        this.updateScreen(operationValue, operation, current, previous)
        break;
      case "/":
        operationValue = previous / current
        this.updateScreen(operationValue, operation, current, previous)
        break;
      case "*":
        operationValue = previous * current
        this.updateScreen(operationValue, operation, current, previous)
        break;
      case "DEL":
        this.processDelOperator()
        break;
      case "CE":
        this.processClearCurrentOperation()
        break;
      case "C":
        this.processClearOperation()
        break;
      case "=":
        this.processEqualOperator()
        break;

      default:
        break;
    }
  }

  /* mudar valores da tela calculadora */
  updateScreen(operationValue = null, operation = null, current = null, previous = null) {
    console.log(operationValue, operation, current, previous)

    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation
    } else {
      if (previous === 0) {
        operationValue = current
      }
      /* add valor atual pro anterior */
      this.previousOperationText.innerText = `${operationValue} ${operation}`
      this.currentOperationText.innerText = ""
    }
  }
  /* mudar operações matemáticas */
  changeOperation(operation){
    const mathOperations = ["+", "-", "/", "*"]

    if (!mathOperations.includes(operation)) {
      return
    }
    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0,-1) + operation
  }
  /* Deletando último digito */
  processDelOperator(){
    this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
  }
  /* Limpando operação atual */
  processClearCurrentOperation(){
    this.currentOperationText.innerText = ""
  }
  /* limpando tudo */
  processClearOperation(){
    this.currentOperationText.innerText = ""
    this.previousOperationText.innerText = ""
  }
  /* Igual */
  processEqualOperator(){
    const operation = previousOperationText.innerText.split(" ")[1]
    this.processOperation(operation)
  }

} /* Fim classe Calculator */

/* Estanciando o objeto após construtor */
const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      calc.addDigit(value)
    } else {
      calc.processOperation(value)
    }
  })
})