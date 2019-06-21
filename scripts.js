var timerId;

document.addEventListener("DOMContentLoaded", function(event) {
  operationsState(true);
  document.getElementById(".").disabled = true;
});

// Insertion symbols in our textbox
function insert(num)
{
  validation(num, "insert");
  document.form.textbox.value +=num;
  timer();
}

// Operations
function equal()
{
  var exp = document.form.textbox.value;
  if(exp)
  {
    document.form.textbox.value = eval(exp);
  }
  timer();
}

function clean()
{
    document.form.textbox.value = "";
    operationsState(true);
    document.getElementById(".").disabled = true;
}

function back()
{
    var tmp = document.form.textbox.value;
    validation(tmp.substring(tmp.length - 1), "back");
    document.form.textbox.value = tmp.substring(0, tmp.length-1);
    timer();
}

function timer()
{
    clearTimeout(timerId);
    timerId = setTimeout(clean, 60000);
}

//Validation

function validation(num, oper)
{
  if(num == "+" || num == "-" || num == "*" || num == "/")
  {
    if(oper == "insert")
    {
      operationsState(true);
      document.getElementById(".").disabled = true;
    }
    else
    {
      operationsState(false);
    }
  }
  else if(num == ".")
  {
    if(oper == "insert")
    {
      document.getElementById(".").disabled = true;
      operationsState(true);
    }
    else
    {
      document.getElementById(".").disabled = false;
    }
  }
  else
  {
    if(oper == "insert")
    {
      operationsState(false);

      var tmp = document.form.textbox.value;
      var maxPosition0fOperation = -1;
      var operations = ["+", "-", "*", "/"];

      for(var i = 0; i < 4; i++)
      {
        if(tmp.lastIndexOf(operations[i]) > maxPosition0fOperation)
        {
            maxPosition0fOperation = tmp.lastIndexOf(operations[i]);
        }
      }

      if((tmp.lastIndexOf(".") <= maxPosition0fOperation && (tmp.substring(tmp.length-1)!= "+" || tmp.substring(tmp.length-1)!= "-" || tmp.substring(tmp.length-1)!= "*" || tmp.substring(tmp.length-1)!="/")))
      {
        document.getElementById(".").disabled = false;
      }
    }
    else
    {
      var tmp = document.form.textbox.value.substring(document.form.textbox.value.length - 1);
      if(tmp == "" ||  tmp == "+" ||  tmp == "-" ||  tmp == "*" ||  tmp == "/")
      {
        operationsState(true);
      }
      else
      {
        operationsState(false);
      }
    }
  }
}

function operationsState(state)
{    
    document.getElementById("+").disabled = state;
    document.getElementById("-").disabled = state;
    document.getElementById("*").disabled = state;
    document.getElementById("/").disabled = state;
    document.getElementById("=").disabled = state;
}