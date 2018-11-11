function getUsers(callback){
	$.ajax({
		url:'./json/test_users.json',
		type: "GET",
		dataType: "json",
		success: function(result){
			callback(result);
		}
	});
}
function getGroups(callback){
	$.ajax({
		url:'./json/test_groups.json',
		type: "GET",
		dataType: "json",
		success: function(result){
			callback(result);
		}
	});
}
function getRoles(callback){
	$.ajax({
		url:'./json/test_roles.json',
		type: "GET",
		dataType: "json",
		success: function(result){
			callback(result);
		}
	});
}
function getSingleUser(callback){
	$.ajax({
		url:'./json/test_single_user.json',
		type: "GET",
		dataType: "json",
		success: function(result){
			callback(result);
		}
	});
}
/*
*This function send data to server using POST-method.
*"success"-function is just for test now.
*/
function createGroup(){
	var name = $("#groupNameField").val();
	$.ajax({
		url :'./test.php',
		type: 'POST',
		data:  {"name": name},
		success: function(result){
			//Here may be call of function to draw UI 
			//after successful/fail  group creating
		}		
	});	
}
/*
*Now it doesn't work right. We get "403-Forbidden" code.
*May be the reason is absence of server-side in the tests
*/
function deleteGroups(){
	if( $("input:checkbox:checked").length === 0 ){
		$("#noGroupAlert").popup("open",{"transition": "fade"});
	} else {
		$.each($("input:checkbox:checked"), function(i,o){
			$.ajax({
				/*
				*We need an api-address instead of 'test.php' here
				*e.g. /groups/<id> 
				*/
				url:'test.php',
				type: "DELETE",
				success: function(result){
					alert(result);
				}
			});
		});
	}
	
}
/*
*Now it doesn't work right. We get "403-Forbidden" code.
*May be the reason is absence of server-side in the tests
*/
function editUserRoles(){
	var user_id = $("#user_id").val();
	var selectedRoles = new Array();
	$("input:checkbox:checked").each(function(i,o){
		/*
		*As names of checkboxes contain "role_<id>",
		*we get only <id> of role
		*/
		selectedRoles.push(o.name.substr(5));
	});
	$.ajax({
		/*
		*Here api-address must be.
		*e.g. /users/<id>
		*User_id variable contains id of edited user
		*/
		url:'./test.php',
		type: "PUT",
		data: { "userRoles" : selectedRoles },
		success: function(result){
			alert(result);
		}
	});
}
/*
*Now it doesn't work right. We get "403-Forbidden" code.
*May be the reason is absence of server-side in the tests
*/
function editUserGroups(){
	var user_id = $("#user_id_for_group").val();
	var selectedGroups = new Array();
	$("input:checkbox:checked").each(function(i,o){
		/*
		*As names of checkboxes contain "group_<id>",
		*we get only <id> of group
		*/
		selectedGroups.push(o.name.substr(6));
	});
	$.ajax({
		/*
		*Here api-address must be.
		*e.g. /users/<id>
		*User_id variable contains id of edited user
		*/
		url:'./test.php',
		type: "PUT",
		data: { "userGroups" : selectedGroups },
		success: function(result){
			alert(result);
		}
	});
}
/*
*Now it doesn't work right. We get "403-Forbidden" code.
*May be the reason is absence of server-side in the tests
*/
function massUserAddRoles(){
	var selectedUsers = new Array();
	var selectedRoles = new Array();
	var jsonUsers = {"users" : []};
	$(".users:input:checkbox:checked").each(function(i,o){
		/*
		*As names of checkboxes contain "user_<id>",
		*we get only <id> of user
		*/
		selectedUsers.push(o.name.substr(5));
	});
	$(".roles:input:checkbox:checked").each(function(i,o){
		/*
		*As names of checkboxes contain "role_<id>",
		*we get only <id> of role
		*/
		selectedRoles.push(o.name.substr(5));
	});
	/*
	*Prepare object "users" to send.
	*/
	$.each(selectedUsers, function(i,o){
		jsonUsers.users.push({"id": o, "userRoles":selectedRoles});
	});
	$.ajax({
		/*
		*Here api-address must be.
		*e.g. /users/
		*/
		url: './test.php',
		type: "PUT",
		data: jsonUsers,
		success: function(result){
			alert(result);
		}
	});
}
/*
*Now it doesn't work right. We get "403-Forbidden" code.
*May be the reason is absence of server-side in the tests
*/
function massUserEditGroups(){
	var selectedUsers = new Array();
	var selectedGroups = new Array();
	var jsonUsers = {"users" : []};
	$(".users:input:checkbox:checked").each(function(i,o){
		/*
		*As names of checkboxes contain "user_<id>",
		*we get only <id> of user
		*/
		selectedUsers.push(o.name.substr(5));
	});
	$(".groups:input:checkbox:checked").each(function(i,o){
		/*
		*As names of checkboxes contain "group_<id>",
		*we get only <id> of group
		*/
		selectedGroups.push(o.name.substr(6));
	});
	/*
	*Prepare object "users" to send.
	*/
	$.each(selectedUsers, function(i,o){
		jsonUsers.users.push({"id": o, "userGroups":selectedGroups});
	});
	alert(JSON.stringify(jsonUsers));
	$.ajax({
		/*
		*Here api-address must be.
		*e.g. /users/
		*/
		url: './test.php',
		type: "PUT",
		data: jsonUsers,
		success: function(result){
			alert(result);
		}
	});
}
