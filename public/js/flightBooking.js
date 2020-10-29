

function validateTrip(tripType)
        {
            if(tripType == 'oneWay')
            {
                document.getElementById('returnTrip').hidden = true;
            }
            else
            {
                 document.getElementById('returnTrip').hidden = false;
            }
            
        }

        
function validateDate(dateType)
{
    var date = new Date();
    
    if(dateType == 'departureDate')
    {
        var departureDate = document.getElementById('departureDate').value;
        if(new Date(departureDate)<date)
        {
            alert('Invalid Date !');
        }
    }
    
    if(dateType == 'returnDate')
    {
        var departureDate = document.getElementById('departureDate').value;
        var returnDate = document.getElementById('returnDate').value;
        if(returnDate < departureDate)
        {
            alert('Invalid Date Selection!')
        }
    }
}

function validateAdult()
{
    var adultCount = document.getElementById('adult').value;
    if(adultCount <= 0)
    {
        alert('Invalid adult field value.Please enter adult field value greater than zero.')
    }
}

function addAdult()
{
    var div = document.createElement('div');
    div.setAttribute('id','passenger');
     var table = document.createElement('table');
     var tr1    = document.createElement('tr');
     var tr2    = document.createElement('tr');
     var tr3    = document.createElement('tr');
     var tr4    = document.createElement('tr');

     var th1   = document.createElement('th');
     var th2   = document.createElement('th');
     var th3   = document.createElement('th');

     var th4   = document.createElement('th');
     var th5   = document.createElement('th');
     var th6   = document.createElement('th');

     th1.innerHTML += "<label>First Name & Last Name</label>";
     th2.innerHTML += "<label>Last Name</label>";
     th3.innerHTML += "<label>Gender</label>";
     th4.innerHTML += "<label>Meal</label>";
     th5.innerHTML += "<label>Wheel Chair</label>";
     th6.innerHTML += "<label>Date of Birth</label>";

     tr1.appendChild(th1);
     tr1.appendChild(th2);
     tr1.appendChild(th3);
     tr3.appendChild(th4);
     tr3.appendChild(th5);
     tr3.appendChild(th6);
     
     var td1    = document.createElement('th')
     var input = document.createElement('input');
     input.setAttribute('type','text');
     input.setAttribute('id','passenger');
     input.setAttribute('style','height:30px');
     td1.appendChild(input);

     var td2    = document.createElement('th')
     var input1 = document.createElement('input');
     input1.setAttribute('type','text');
     input1.setAttribute('id','passenger');
     input1.setAttribute('style','height:30px');
    td2.appendChild(input1);

     var td3    = document.createElement('th')
     var input2 = document.createElement('input');
     input2.setAttribute('style','height:30px');
     input2.setAttribute('type','text');
     input2.setAttribute('id','passenger');
     td3.appendChild(input2);

     var td4    = document.createElement('th')
    //  var input3 = document.createElement('option');
    //  input3.setAttribute('type','text');
    //  input3.setAttribute('id','passenger');
     td4.innerHTML += "<select style='height:30px;width:180px'><option>Vegetarian</option><option>Non-Vegetarian</option></select>";

     var td5    = document.createElement('th')
    //  var input4 = document.createElement('input');
    //  input4.setAttribute('type','text');
    //  input4.setAttribute('id','passenger');
    //  input4.setAttribute('style','height:30px');

    td5.innerHTML += "<select style='height:30px;width:180px'><option>Not-Required</option><option>Required</option></select>";

     var td6    = document.createElement('th')
     var input5 = document.createElement('input');
     input5.setAttribute('type','text');
     input5.setAttribute('style','height:30px');
     input5.setAttribute('id','passenger');
     td6.appendChild(input5);

     tr2.appendChild(td1);
     tr2.appendChild(td2);
     tr2.appendChild(td3);
     tr4.appendChild(td4);
     tr4.appendChild(td5);
     tr4.appendChild(td6);

     table.appendChild(tr1);
     table.appendChild(tr2);
     table.appendChild(tr3);
     table.appendChild(tr4);
     div.appendChild(table);
      var node = document.getElementById("adultAdd");
     node.appendChild(div);
}

function validatePassenger()
{
    var childrn = document.getElementById("adultAdd").getElementsByTagName("div");

    if(childrn.length == 0)
    {
        alert('Please enter passenger details !');
        return false;
    }
    if(document.getElementById("mobileNumber").value == "" || document.getElementById("mobileNumber").value == null)
    {
        alert('Please enter Mobile Number !');
        return false;
    }
    if(document.getElementById("emailId").value == "" || document.getElementById("emailId").value == null)
    {
        alert('Please enter email Id !');
        return false;
    }
    if(document.getElementById("Acknowledgement").checked == false)
    {
        alert('Please select acknowledgement !');
        return false;
    }
    else
    {
        var jsonArr= [childrn.length];
        
        for(var i=0;i<childrn.length;i++)
        {
            var v = childrn[i].getElementsByTagName('input');
                 jsonArr[i] = {
                    "passengerFirstName" :  v[0].value,
                    "passengerLastName" : v[1].value,
                    "passengerGender"   : v[2].value,
                    "passengerDOB"      : v[3].value
                     };
        }

        
        //session.setAttribute('passenger',jsonArr);
    }
    
   //sessionStorage.setItem('passenger','Hiii');
    return true;
}