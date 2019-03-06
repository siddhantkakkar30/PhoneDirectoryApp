window.onload = function()
{
	var quickAddBtn=  document.getElementById("QuickAdd");
	var AddBtn=  document.getElementById("Add");
	var quickAddFormDiv= document.querySelector(".quickaddForm")
	
	var fullname= document.getElementById("fullname");
	var phone=    document.getElementById("phone");
	
	
	var addphoneDiv= document.querySelector(".addphone");
	 
	var phoneDirectory = [];
	
        	quickAddBtn.addEventListener("click", function()
			   {
		    quickAddFormDiv.style.display = "block";
			   });
	
	AddBtn.addEventListener("click",addToPhone);
	
	addphoneDiv.addEventListener("click",removeEntry);
	
	function jsonStructure(fullname,phone)
	{
		this.fullname= fullname;
		this.phone=phone;
	}
	
	
	function addToPhone()
	{
		var isNull= fullname!='' && phone.value!= '';
		if(isNull)
			{
			var obj= new jsonStructure(fullname.value,phone.value);
			phoneDirectory.push(obj);
			localStorage['addphone'] = JSON.stringify(phoneDirectory);
			
			quickAddFormDiv.style.display = "none";
			
			clearForm();
			
			showphoneDirectory();
			
			
			
			}
	}
	function removeEntry(e){
		
		if(e.target.classList.contains("delbutton"))
			{
			var remID = e.target.getAttribute("data-id");
			phoneDirectory.splice(remID,1);
			 localStorage['addphone'] = JSON.stringify(phoneDirectory);
			 showphoneDirectory();
			}
		
	}
	
	function clearForm()
	{
		var frm = document.querySelector(".formFields");
		for(var i in frm)
			{
			frm[i].value= "";
			}
	}
	function showphoneDirectory()
	{
		if(localStorage['addphone'] === undefined)
			{
			localStorage['addphone'] = "[]";
			}
		else
			{
			phoneDirectory = JSON.parse(localStorage['addphone']);
			addphoneDiv.innerHTML = '';
			for(var n in phoneDirectory)
				{
				var str= '<div class="entry">';
				str += '<div class=" name"><p>'+ phoneDirectory[n].fullname + '</p></div>';
				str += '<div class=" phone"><p>'+ phoneDirectory[n].phone + '</p></div>';
				str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
				str += "</div>";
				addphoneDiv.innerHTML += str;
				 
				}
			}
	}
	showphoneDirectory();
	}