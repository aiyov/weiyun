//window.onload = function(){
	var Seek = document.getElementsByClassName('seek')[0];
	var Search = document.getElementsByClassName('search')[0];
	var Delete = document.getElementsByClassName('del')[0];
	var Add = document.getElementsByClassName('add')[0];
	var Up_list = document.getElementsByClassName('up_list')[0];
	var fileType = document.getElementsByTagName('dd');
	var File_nav = document.getElementsByClassName('file_nav')[0];
	
	Search.onclick = function(ev){
		checkTrue();
		ev.cancelBubble = 'true';
		Seek.value = '';
		Seek.focus();
		this.className = 'search focus';
		Delete.style.display = 'block';
		
		document.onclick = function(){
			Seek.value = '输入文件名';
			Search.className = 'search';
			Delete.style.display = 'none';
			document.onclick = null;
		}
	}
	Delete.onclick = function(){
		Seek.value = '';
	}
	
	Add.onmouseover = function(){
		Up_list.style.display = 'block';
	}
	Add.onmouseout = function(){
		Up_list.style.display = 'none';
	}
	
	var old = fileType[0];
	for (var i = 0; i < fileType.length; i++) {
		fileType[i].index = i;
		fileType[i].onclick = function(){
			delF.splice(0,delF.length);
			num = 0;
			doTool();
			delF.length = 0;
			var b = old.className.split(' ')[0];
			old.className = b;
			var a = this.className;
			this.className = a+' select';
			old = this;
			var type = this.getAttribute('type');
			folderType(type)
		}
	}
	function folderType(type){
		Data.innerHTML = '';
		if(type == 'all'){
			File_nav.style.display = 'block';
			arr.splice(0,arr.length);
			arr.push(database);
			nav();
			addFolder(database);
		}else{
			File_nav.style.display = 'none';
			findtype(database);
			function findtype(data){
				data.forEach(function(a){
					createFile(a)
				});
			}
			function createFile(obj){
				if(obj.fileType == type){
					var Li = document.createElement('li');
					Li.className = 'file';
					var bg = document.createElement('div');
					bg.className = obj.fileType;
					var title = document.createElement('div');
					title.className = 'file_title';
					title.innerHTML = obj.name;
					var Input = document.createElement('input');
					Input.type = 'text';
					Input.className = 'file_reName';
					Input.value = title.innerHTML;
					Input.style.display = 'none';
					title.style.display = 'block';
					var div = document.createElement('div');
					div.onOff = false;
					div.className = 'file_choose';
					div.onclick = function(){
						if(!this.onOff){
							delF.push(obj.id);
							num++;
							this.className = 'file_choose T';
							this.style.borderColor = '#2083E7';
							this.parentNode.style.background = '#f3f9ff';
						}else{
							for (var i = 0; i < delF.length; i++) {
								if(delF[i] == obj.id){
									delF.splice(i,1);
									return
								}
							}
							num--;
							this.className = 'file_choose';
							this.style.borderColor = '#c7c9cc';
							this.parentNode.style.background = '';
						}
						Download.style.display = 'none';
						Remove.style.display = 'none';
						changeName.style.display = 'none';
						
						doTool();
						this.onOff = !this.onOff;
						folderDel.onclick = function(){
							Del.style.display = 'block';
							Mask.style.display = 'block';
							Del_make.onclick = function(){
								findArrs(database);
								folderType(type);
								Del_hidden.onclick();
							}
							Del_hidden.onclick = Del_none.onclick = function(){
								Mask.style.display = 'none';
								Del.style.display = 'none';
							}
							function findArrs(data){
								for (var i = 0; i < data.length; i++) {
									for(var j = 0; j < delF.length; j++){
										if(data[i].id == delF[j]){
											delFed.push(data[i])
											data.splice(i,1);
											delF.splice(j,1);
											i--;
											j--;
										}
									}
									if(data[i].child){
										findArrs(data[i].child)
									}
								}
							};
						}
					}
					var file_tool = document.createElement('div');
					file_tool.className = 'file_tool';
					var downLoad = document.createElement('span');
					downLoad.className = 'fa fa-download';
					var remove = document.createElement('span');
					remove.className = 'fa fa-trash';
					remove.onclick = function(){
						findArr(database);
						folderType(type);
						function findArr(data){
							for(var j = 0; j < delF.length; j++){
								if(delF[j] == obj.id){
									delF.splice(j,1);
								}
							}
							for (var i = 0; i < data.length; i++) {
								if(data[i].id == obj.id){
									data.splice(i,1);
									delFed.push(data[i]);
									return
								}
								if(data[i].child){
									findArr(data[i].child)
								}
							}
						};
					}
					var reName = document.createElement('span');
					reName.onclick = function(ev){
						ev.cancelBubble = true;
						Input.style.display = 'block';
						title.style.display = 'none';
						Input.select();
						Input.onclick = function(ev){
							ev.cancelBubble = true;
						}
						document.onclick = function(){
							if(Input.value == ''){
								title.innerHTML = obj.name;
								Input.value = obj.name;
							}else{
								title.innerHTML = Input.value;
								obj.name = Input.value;
							}
							Input.style.display = 'none';
							title.style.display = 'block';
							document.onclick = null;
						}
					}
					reName.className = 'fa fa-pencil-square-o';
					file_tool.appendChild(downLoad);
					file_tool.appendChild(remove);
					file_tool.appendChild(reName);
					Li.appendChild(div);
					Li.appendChild(Input)
					Li.appendChild(title);
					Li.appendChild(bg);
					Li.appendChild(file_tool);
					Data.appendChild(Li);
				}
				if(obj.child){
					findtype(obj.child);
				}
			}
		}
		
	}
	
//}
