var postfix, expression;
postfix = '';
expression = '';

function isEmpty(stack) {
  if(stack.length === 0) {
    return true;
  } else {
    return false;
  }
}

function topStack(stack) {
  var top = stack[stack.length - 1];
  return top;
}

function getOperatorWeight(operator) {
  var weight;
  if(operator == '/' || operator == '*') {
    weight = 2;
  } else if(operator == '+' || operator == '-') {
    weight = 1;
  } else {
    weight = 0;
  }
  return weight;
}

function hasHigherPrecedence(stackItem, expressionOperator) {
  var stackWeight, expressionOpWeight;
  stackWeight = this.getOperatorWeight(stackItem);
  expressionOpWeight = this.getOperatorWeight(expressionOperator);
  if(stackWeight == expressionOpWeight ) {
    return true;
  }
  return stackWeight > expressionOpWeight ? true : false;
}

function isOperator(expressionChar) {
  if(expressionChar == '/' || expressionChar == '*' || expressionChar == '+' || expressionChar == '-') {
    return true;
  } else {
    return false;
  }
}

function isOperand(expressionChar) {
  if(expressionChar == '/' || expressionChar == '*' || expressionChar == '+' || expressionChar == '-') {
    return false;
  } else {
    return true;
  }
}

function infixToPostfix(infixExpression) {
  console.log("infix expression: " +infixExpression);
  var infixExpToArray = infixExpression.split(' ');
  var operators = [];
  for(var i = 0; i < infixExpToArray.length; i++) {
    if(isOperator(infixExpToArray[i])) {
      while(!this.isEmpty(operators) && this.hasHigherPrecedence(this.topStack(operators), infixExpToArray[i])) {
        postfix += operators.pop() + " ";
      }
      operators.push(infixExpToArray[i]);
      
    } else if(isOperand(infixExpToArray[i])) {
        postfix += infixExpToArray[i] + " ";
    }
  }
  while(!this.isEmpty(operators)) {
    postfix += operators.pop() + " ";
  }
  console.log("Postfix: " +postfix);
  return postfix;
}

function changeOutputText(id, btnClass) {
  if(id == 'ac') {
    document.getElementById('output').innerHTML ='';
    this.expression = '';
    postfix = '';
  } else if (id == 'equals'){
    document.getElementById('output').innerHTML = postfix;
  } else {
    document.getElementById('output').innerHTML +=  document.getElementById(id).innerHTML;
    expression += document.getElementById(id).textContent;
    console.log("expression: " +expression);
  }
  
}

function performEval(operand1, operand2, operator) {
  switch(operator) {
    case '*':
      return Number(operand1) * Number(operand2);
    case '/':
      return Number(operand1) / Number(operand2);
    case '+':
      return Number(operand1) + Number(operand2);
    case '-':
      return Number(operand1) - Number(operand2);
  } 
}
function evalPostfix(expression) {
  var operands, expressionArray;
  var operator1, operator2, result;
  operands = [];
  expressionArray = expression.split(" ");
  for(var i = 0; i < expressionArray.length; i++) {
    if(this.isOperand(expressionArray[i])) {
      operands.push(expressionArray[i]);
    } else {
      //reverse the operators positions due to the LIFO nature of the stack
      operator2 = operands.pop();
      console.log("operator1: " +this.topStack(operands));
      operator1 = operands.pop();
      result = this.performEval(operator1, operator2, expressionArray[i]);
      console.log("pushing: " +result);
      operands.push(result);
    }
  }
  //return the final result
  console.log("Final result: " +operands.pop());
  return operands.pop();
}

$(document).ready(function(){
  $(".button").on('click', function() {
    var id = this.id;
    var btnClass = this.className;
    changeOutputText(id, btnClass);
  }); 
  
  $("#equals").on('click', function() {
    console.log("expression in equals: " +expression);
    document.getElementById('output').innerHTML = evalPostfix((infixToPostfix(expression)));
  });
    postfix = '';
    expression = '';
                 
});