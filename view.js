/*
*Navigation loader. Starts when DOM is loaded
*Here is setting up of navigation buttons' handlers (Users/Groups)
*/
$(function(){
    $("#btnusers").on("click", function (e) {
        $.mobile.loading("show", {
            text: "Loading...",
            textVisible: true,
            theme: "b",
            overlayTheme: "b"
        });
		$("#menu").load("./usermenupopup.html", function () {
            $(this).enhanceWithin();
        });
        $("#app-content").load("./userlist.html", function () {
            $(this).enhanceWithin();
            getUsers(function (users){
				var html = '<ul data-role="listview" data-inset="true" data-filter="true">';
				$.each(users.users, function(i, o){
					html = html + '<li><a href="#" id="'+o.id+'" onclick="userClick	('+o.id+')">'+o.name+'</a></li>';		
				});
				html = html + '</ul>';
				$('#userlist').html(html).trigger("create");
			});
            $.mobile.loading("hide");
    	});
	$("#btnusers").addClass("ui-btn-active");
    });
	$("#btngroups").on("click", function (e) {
		$.mobile.loading("show", {
		    text: "Loading...",
		    textVisible: true,
		    theme: "b",
		    overlayTheme: "b"
		});
		e.preventDefault();
		$("#menu").load("./groupmenupopup.html", function () {
		    $(this).enhanceWithin();
		});
		$("#app-content").load("./grouplist.html", function () {
		    $(this).enhanceWithin();
		    getGroups(function (groups){
				var html = '<ul data-role="listview" data-inset="true" data-filter="true">';
				$.each(groups.groups, function(i, o){
					html = html + '<li id="'+o.id+'">'+o.name+'</li>';		
				});
				html = html + '</ul>';
				$('#grouplist').html(html).trigger("create");
			});
		    $.mobile.loading("hide");
		});
    });
    $('#btnusers').trigger("click");
});
/*
*This function prepare and open view to manage groups/roles of several users
*isSelectAll parameter is boolean. If it's true all checboxes will be checked
*/
function openUserEditingView(isSelectAll){
		$("#menu").popup("close");
		$("#app-content").load("./useredit.html", function () {
		    $(this).enhanceWithin();
		    getUsers(function (users){
				var html ='';
				$.each(users.users, function(i, o){
					if(isSelectAll){
						html = html + '<input type="checkbox" class="users" name="user_'+o.id+'" id="user_'+o.id+'" checked><label for="user_'+o.id+'">'+o.name+'</label>';		
					} else {
						html = html + '<input type="checkbox" class="users" name="user_'+o.id+'" id="user_'+o.id+'"><label for="user_'+o.id+'">'+o.name+'</label>';		
					}
				});
				$("#usereditlist").html(html).trigger("create");
			});
		});		
}
/*
*This function set trigger to open one of popups in user editing mode
*/
function editBtnOnClick(){
	if( $("input:checkbox:checked").length === 0 ){
		$("#noUserAlert").popup("open",{"transition": "fade"});
	} else {
		$("#editmenu").popup("open",{"transition": "fade"});
	}
}
/*
*this function open a form for new group
*/
function createNewGroup(){
	$("#menu").popup("close");
	$("#app-content").load("./newgroupform.html", function () {
		$(this).enhanceWithin();
	});
}
/*
*This function prepare panel to mass edit users' roles
*/
function addRoleBtnClicked(){
	//TODO: RoleManager
	$("#editmenu").popup("close");
	$("#rolesPanel").panel("open");
	getRoles(function (roles){
		var html ='';
		$.each(roles.roles, function(i, o){
			html = html + '<input type="checkbox" class="roles" name="role_'+o.id+'" id="role_'+o.id+'"><label for="role_'+o.id+'">'+o.name+'</label>';		
		});
		$('#rolelist').html(html).trigger("create");
	});
}
/*
*This function prepare panel to mass edit users' groups
*/
function addToGrpBtnClicked(){
	$("#editmenu").popup("close");
	$("#groupsPanel").panel("open");
	getGroups(function (groups){
		var html ='';
		$.each(groups.groups, function(i, o){
			html = html + '<input type="checkbox" class="groups" name="group_'+o.id+'" id="group_'+o.id+'"><label for="group_'+o.id+'">'+o.name+'</label>';		
		});
		$('#grouplistpan').html(html).trigger("create");
	});
}
/*
*This function adds triggers to usermenu's buttons
*according with user's id
*/
function userClick(id){
	$("#singleUserMenu").popup("open",{"transition": "fade"});
	$("#addSingleUserRoleBtn").on("click", function(){
		addRoleToSingleUser(id);
	});
	$("#delSingleUserRoleBtn").on("click", function(){
		delRoleFromSingleUser(id);
	});
	$("#addSingleUserToGrpBtn").on("click", function(){
		addSingleUserToGroup(id);
	});
}

/*
*This function open a panel to add roles to single user
*and show what roles've already set
*/
function addRoleToSingleUser(id){
	$("#singleUserMenu").popup("close");
	$("#rolesPanel").panel("open");
	getRoles(function (roles){
		var html ='';
		getSingleUser(function (user){
			$.each(roles.roles, function(i, o){
				if(-1 === $.inArray(o.id, user.userRoles)){
					html = html + '<input type="checkbox" name="role_'+o.id+'" id="role_'+o.id+'"><label for="role_'+o.id+'">'+o.name+'</label>';		
				} else {
					html = html + '<input type="checkbox" name="role_'+o.id+'" id="role_'+o.id+'" checked><label for="role_'+o.id+'">'+o.name+'</label>';		
				}
			});
			$('#user_id').val(id);
			$('#rolelist').html(html).trigger("create");
		});
	});
}
/*
*This function prepare and show panel to see and edit user's groups
*/
function addSingleUserToGroup(id){
	$("#singleUserMenu").popup("close");
	$("#groupsPanel").panel("open");
	getGroups(function (groups){
		var html ='';
		getSingleUser(function (user){
			$.each(groups.groups, function(i, o){
				if(-1 === $.inArray(o.id, user.userGroups)){
					html = html + '<input type="checkbox" name="group_'+o.id+'" id="group_'+o.id+'"><label for="group_'+o.id+'">'+o.name+'</label>';
				} else {
					html = html + '<input type="checkbox" name="group_'+o.id+'" id="group_'+o.id+'" checked><label for="group_'+o.id+'">'+o.name+'</label>';
				}	
			});
			$('#user_id_for_group').val(id);
			$('#groupchoise').html(html).trigger("create");
		});
	});
}
/*
*This function prepare and load view to delete some groups
*/
function openDeleteGrpView(){
	$("#menu").popup("close");
	$("#app-content").load("./delgroup.html", function () {
		$(this).enhanceWithin();
		getGroups(function (groups){
				var html ='';
				$.each(groups.groups, function(i, o){
					html = html + '<input type="checkbox" name="'+o.id+'" id="group_'+o.id+'"><label for="group_'+o.id+'">'+o.name+'</label>';		
				});
			$('#groupchoise').html(html).trigger("create");
		});
	});
	
}

/*
*May be it's useless function?
*/
function delRoleFromSingleUser(id){
	alert("care");
	$("#singleUserMenu").popup("close");
}
/*
*All next functions may be better
*/
function editMnCancell(){
    $("#app-content").load("./userlist.html", function () {
        $(this).enhanceWithin();
	});
}
function cancelGrpCreatingClicked(){
	$("#app-content").load("./grouplist.html", function () {
	    $(this).enhanceWithin();
	});
	getGroups(function (groups){
		var html = '<ul data-role="listview" data-inset="true" data-filter="true">';
		$.each(groups.groups, function(i, o){
			html = html + '<li id="'+o.id+'">'+o.name+'</li>';		
		});
		html = html + '</ul>';
		$('#grouplist').html(html).trigger("create");
	});
}
function cancelDelGrpBtnClicked(){
	$("#app-content").load("./grouplist.html", function () {
	    $(this).enhanceWithin();
	    getGroups(function (groups){
			var html = '<ul data-role="listview" data-inset="true" data-filter="true">';
			$.each(groups.groups, function(i, o){
				html = html + '<li id="'+o.id+'">'+o.name+'</li>';		
			});
			html = html + '</ul>';
			$('#grouplist').html(html).trigger("create");
		});
	});
}
