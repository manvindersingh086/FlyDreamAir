
var count=0;
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
            document.getElementById('departureDate').value = "";
        }
    }
    
    if(dateType == 'returnDate')
    {
        var departureDate = document.getElementById('departureDate').value;
        var returnDate = document.getElementById('returnDate').value;
        if(returnDate < departureDate)
        {
            alert('Invalid Date Selection!');
            document.getElementById('returnDate').value = "";
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

function addAdult(flightType,adultCount)
{
    if(count<adultCount)
    {
        count = count+1;
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
     input.setAttribute('id','firstName');
     input.setAttribute('name','firstName');
     input.setAttribute('style','height:30px');
     td1.appendChild(input);

     var td2    = document.createElement('th')
     var input1 = document.createElement('input');
     input1.setAttribute('type','text');
     input1.setAttribute('id','lastName');
     input1.setAttribute('name','lastName');
     input1.setAttribute('style','height:30px');
    td2.appendChild(input1);

     var td3    = document.createElement('th')
     td3.innerHTML += "<select style='height:30px;width:180px' id='gender' name='gender'><option>Male</option><option>Female</option></select>";


     var td4    = document.createElement('th')
     td4.innerHTML += "<select id='meal' name='meal' style='height:30px;width:180px'><option>Vegetarian</option><option>Non-Vegetarian</option></select>";

     var td5    = document.createElement('th')
     td5.innerHTML += "<select id='wheelChair' name='wheelChair' style='height:30px;width:180px'><option>Not-Required</option><option>Required</option></select>";

     var td6    = document.createElement('th')
     var input5 = document.createElement('input');
     input5.setAttribute('type','date');
     input5.setAttribute('name','DOB');
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
   
     var tr5,tr6,th7,th8;
     if(flightType == 'International')
     {
         tr5    = document.createElement('tr');
         tr6    = document.createElement('tr');
         th7   = document.createElement('th');
         th8   = document.createElement('th');
        th7.innerHTML += "<label>Passport Number</label>";
        th8.innerHTML += "<label>Passport Name</label>";

        var tdP1    = document.createElement('th')
        var inputP = document.createElement('input');
        inputP.setAttribute('type','text');
        inputP.setAttribute('id','passportNumber');
        inputP.setAttribute('name','passportNumber');
        inputP.setAttribute('style','height:30px');
        tdP1.appendChild(inputP);

     var tdP2    = document.createElement('th')
     var inputP2 = document.createElement('input');
     inputP2.setAttribute('type','text');
     inputP2.setAttribute('id','passportName');
     inputP2.setAttribute('name','passportName');
     inputP2.setAttribute('style','height:30px');
     tdP2.appendChild(inputP2);

        tr5.appendChild(th7);
        tr5.appendChild(th8);
        tr6.appendChild(tdP1);
        tr6.appendChild(tdP2);
        table.appendChild(tr5);
        table.appendChild(tr6);
     }
     div.appendChild(table);
      var node = document.getElementById("adultAdd");
     node.appendChild(div);
    }
}

function validatePassenger(passengerCount)
{
    var childrn = document.getElementById("adultAdd").getElementsByTagName("div");

    if(count < passengerCount)
    {
        alert('Please add valid number of passengers as mentioned on the flight search page.');
        return false;
    }
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

function validateFlightBooking()
{
    var departureDate = document.getElementById('departureDate');
    var returnDate = document.getElementById('returnDate');
    var flightType = document.getElementById('roundWay').checked;

    
     if(departureDate.value == "" || departureDate.value == null)
     {
         alert('Departure date is mandatory!');
         return false;
     }
     if(flightType == true && (returnDate.value == "" || returnDate.value == null))
     {
         alert('Return date is mandatory!');
         return false;
     }
    return true;
}

function validateSeats(passengerCount)
{
    var A1= document.getElementById('1A').checked;
    var B1= document.getElementById('1B').checked;
    var C1= document.getElementById('1C').checked;
    var D1= document.getElementById('1D').checked;
    var E1= document.getElementById('1E').checked;
    var F1= document.getElementById('1F').checked;

    var count=0;

    if(A1==true)
    {
        count = count++;
    }
    if(B1 == true)
    {
        count++;
    }
    if(C1 == true)
    {
        count++;
    }
    if(count > passengerCount)
    {
      alert('Invalid Seat Selection!'); 
      return false;  
    }

    return true;
    
}

function validateGiftCard()
{
    const occassion = document.getElementById('ocassion').value;
    const amount = document.getElementById('amount').value;
    const quantity = document.getElementById('quantity').value;
    const date = document.getElementById('date').value;
    const msg = document.getElementById('message').value;
    const sendrName = document.getElementById('senderName').value;
    const sendrEmail = document.getElementById('senderEmail').value;
    const sendrContactNumber = document.getElementById('senderContactNumber').value;
    const sendrAddress =  document.getElementById('senderAddress').value;
    const recName = document.getElementById('recieverName').value;
    const recEmail = document.getElementById('recieverEmail').value;
    const recContactNumber = document.getElementById('recieverContactNumber').value;
    const recAddress = document.getElementById('recieverAddress').value;

    if(occassion == "" || amount == "" || quantity == "" || date == "" || msg == "" || sendrName == "" || senderEmail == ""
    || sendrEmail == "" || sendrContactNumber == "" || sendrAddress == "" || recName == "" || recEmail == "" || recContactNumber == "" || recAddress == "")
    {
        alert("Enter all the details!")
        return false;
    }
    return true;
}

function validateNumber(field)
{
    if(isNaN(field.value))
    {
        alert('Please enter number!');
        field.value =  "";
    }
}

function validateGiftCardDate()
{
    var date = new Date();

        var departureDate = document.getElementById('date').value;
        if(new Date(departureDate)<date)
        {
            alert('Invalid Date !');
            document.getElementById('date').value = "";
        }
}