var Data = document.getElementsByClassName('data')[0];
var Creat_folder = document.getElementsByClassName('create_folder')[0];
var Floder_nav = document.getElementsByClassName('folder_nav')[0];
var Floder_li = Floder_nav.getElementsByTagName('a');
var Rename = document.getElementsByClassName('reName');
var Title = document.getElementsByClassName('title');
var unChoose = document.getElementsByClassName('unchoose');
var AllSelect = document.getElementsByClassName('allSelect')[0];
var Floders = Data.getElementsByTagName('li');
var Tool = document.getElementById('tool');
var Remove = Tool.getElementsByClassName('remove')[0];
var changeName = Tool.getElementsByClassName('changename')[0];
var Download = Tool.getElementsByClassName('download')[0];
var folderDel = Tool.getElementsByClassName('folder_del')[0];
var Snum = document.getElementsByClassName('snum')[0];
var Cancel = document.getElementsByClassName('cancel')[0];
var openFolders = document.getElementsByClassName('open_folders')[0];
var	foldersList	= document.getElementsByClassName('folders_list')[0];
var childMenu = foldersList.getElementsByTagName('li');
var Mask = document.getElementById("mask");
var Move = document.getElementById("move");
var Del = document.getElementById("del");
var Move_del = Del.getElementsByTagName('div')[0];
var Move_move = Move.getElementsByTagName('div')[0];
var Del_make = Del.getElementsByClassName('make')[0];
var Del_none = Del.getElementsByClassName('none')[0];
var Del_hidden = Del.getElementsByClassName('hidden')[0];
var Hidden = document.getElementsByClassName('hidden')[0];
var None = document.getElementsByClassName('none')[0];
var Over = document.getElementsByClassName('over')[0];
var Info = document.getElementsByClassName('info')[0];
var Folder_name = document.getElementsByClassName('folder_name')[0];
var Make = document.getElementsByClassName('make')[0];
var num = 0;//选中的文件夹的数量；
var n = 0;//被选中的文件夹（重命名）；
var delF = [];//当前被选中的文件夹；
var delFed = [];//已经被删除的文件；
var arr = [];
var move = true;
AllSelect.onOff = false;

var database = [
		{
			name:'我的文档',
			id:1,
			pid:0,
			fileType:'folder',
			child:[
				{
					name:'课程',
					id:5,
					pid:1,
					fileType:'folder',
					child:[]
				},{
					name:'练习',
					id:6,
					pid:1,
					fileType:'folder',
					child:[]
				},{
					name:'说明',
					id:7,
					pid:1,
					fileType:'txt'
				}
			]
		},{
			name:'我的音乐',
			id:2,
			pid:0,
			fileType:'folder',
			child:[
				{
					name:'周杰伦',
					id:8,
					pid:2,
					fileType:'folder',
					child:[]
				},{
					name:'不能说的秘密',
					id:9,
					pid:2,
					fileType:'mp3'
				},{
					name:'一路向北',
					id:10,
					pid:2,
					fileType:'mp3'
				}
			]
		},{
			name:'我的图片',
			id:3,
			pid:0,
			fileType:'folder',
			child:[
				{
					name:'现在',
					id:11,
					pid:3,
					fileType:'folder',
					child:[]
				},{
					name:'过去',
					id:12,
					pid:3,
					fileType:'folder',
					child:[]
				},{
					name:'图片',
					id:13,
					pid:3,
					fileType:'jpg'
				}
			]
		},{
			name:'使用说明',
			id:4,
			pid:0,
			fileType:'txt'
		}
	];
	
	arr.push(database);
	addFolder(database)
	function addFolder(datas){
		cancelAllS();
		Data.innerHTML = '';
		datas.forEach(function(obj){
			productFolder(obj)
		})
	}
	function productFolder(obj){
		var Li = document.createElement('li');
		var bg = document.createElement('div');
		bg.className = obj.fileType;
		var title = document.createElement('div');
		title.className = 'title';
		title.innerHTML = obj.name;
		var Input = document.createElement('input');
		Input.type = 'text';
		Input.className = 'reName';
		Input.value = title.innerHTML;
		if(obj.name == ''){
			Input.style.display = 'block';
			title.style.display = 'none';
			document.onclick = function(){
				checkTrue();
				document.onclick = null;
			}
		}else{
			Input.style.display = 'none';
			title.style.display = 'block';
		}
		Input.onclick = function(ev){
			ev.cancelBubble = true;
		}
		var choose = document.createElement('div');
		choose.onOff = false;
		choose.className = 'unchoose';
		choose.onclick = function(ev){
			ev.cancelBubble = true;
			checkTrue();
			if(this.onOff == false){
				if(arr[arr.length-1].child){
					delF.push(arr[arr.length-1].child[this.index].id)
				}else{
					delF.push(arr[arr.length-1][this.index].id);
				}
				num++;
				this.className = 'unchoose True';
			}else{
				if(arr[arr.length-1].child){
					for(var i = 0; i < delF.length; i++){
						if(delF[i] == arr[arr.length-1].child[this.index].id){
							delF.splice(i,1);
						}
					}
				}else{
					for(var i = 0; i < delF.length; i++){
						if(delF[i] == arr[arr.length-1][this.index].id){
							delF.splice(i,1);
						}
					}
				}
				num--;
				this.className = 'unchoose';
			}
			this.onOff = !this.onOff;
			allSelect();
			Download.style.display = 'block';
			Remove.style.display = 'block';
			changeName.style.display = 'block';
			doTool();
		}
		
		Li.onclick = function(){
			if(obj.child){
				addFolder(obj.child);
				arr.push(obj);
				nav();
				num = 0;
				doTool();
				delF.length = 0;
			}else{
				return false;
			}
		}
		Li.onmouseenter = function(){
			choose.style.display = 'block';
			this.style.border = '1px solid #389cff';
			this.style.outline = '1px solid #389cff';
		}
		Li.onmouseleave = function(){
			if(choose.onOff == true){
				return false;
			}
			choose.style.display = 'none';
			this.style.border = '1px solid #d5d7df';
			this.style.outline = '0px solid #389cff';
		}
		
		Li.appendChild(bg);
		Li.appendChild(title);
		Li.appendChild(Input);
		Li.appendChild(choose);
		Data.appendChild(Li);
		for (var i = 0; i < unChoose.length; i++) {
			unChoose[i].index = i;
		}
	}
	console.log(File_nav)
	//添加新的文件夹
	Creat_folder.onclick = function(ev){
		File_nav.style.display = 'block';
		fileType[0].onclick();
		checkTrue();
		ev.cancelBubble = true;
		var obj = {};
		obj.name = '';
		obj.id = 'id:'+Math.random();
		obj.fileType = 'folder';
		obj.child = [];
		if(arr[arr.length-1].child){
			obj.pid = arr[arr.length-1].id
			arr[arr.length-1].child.push(obj);
			addFolder(arr[arr.length-1].child)
		}else{
			obj.pid = 0;
			arr[arr.length-1].push(obj);
			addFolder(arr[arr.length-1])
		}
		Rename[Rename.length - 1].focus();
	}
	//全选按钮点击事件
	AllSelect.onclick = function(){
		this.onOff = !this.onOff;
		allTF();
		console.log(delF);
	}
	
	//取消选择事件
	Cancel.onclick = function(){
		num = 0;
		doTool();
		if (arr[arr.length-1].child) {
			addFolder(arr[arr.length-1].child);
		} else{
			addFolder(arr[arr.length-1]);
		}
	}
	
	//重命名按钮
	changeName.onclick = function(ev){
		ev.cancelBubble = true;
		if(num == 1){
			for(var i = 0; i < unChoose.length; i++){
				if(unChoose[i].onOff == true){
					n = i;
					Rename[n].style.display = 'block';
					Title[n].style.display = 'none';
					Rename[n].select();
					Rename[n].onblur = function(){
						if(this.value != ''){
							if(arr[arr.length-1].child){
								arr[arr.length-1].child[n].name = this.value;
							}else{
								arr[arr.length-1][n].name = this.value;
							}
						}
						if(arr[arr.length-1].child){
							addFolder(arr[arr.length-1].child);
						}else{
							addFolder(arr[arr.length-1]);
						}
						Cancel.onclick();
						delF.length = 0;
					}
				}
			}
		}else{
			alert('只能对单个文件重命名')
		}
	}
	//删除文件夹
	folderDel.onclick = function(){
		Mask.style.display = 'block';
		Del.style.display = 'block';
		Del_make.onclick = function(){
			del();
			if(arr[arr.length-1].child){
				addFolder(arr[arr.length-1].child);
			}else{
				addFolder(arr[arr.length-1]);
			}
			delF.length = 0;
			num = 0;
			doTool();
			Del_make.onclick = null;
		}
	}
	Del_hidden.onclick = Del_none.onclick = function(){
		Mask.style.display = 'none';
		Del.style.display = 'none';
	}
	//移动文件夹
	Remove.onclick = function(){
		openFolders.innerHTML = '';
		foldersList.innerHTML = '';
		Mask.style.display = 'block';
		Move.style.display = 'block';
		createmenu(foldersList,database);
	}
	Hidden.onclick = None.onclick = function(){
		Mask.style.display = 'none';
		Move.style.display = 'none';
	}
	
	//确认创建文件夹是否成功
	function checkTrue(){
		if(Rename[Rename.length-1]){
			if(Rename[Rename.length-1].value == ''){
				if (arr[arr.length-1].child) {
					arr[arr.length-1].child.pop();
					addFolder(arr[arr.length-1].child);
				} else{
					arr[arr.length-1].pop();
					addFolder(arr[arr.length-1]);
				}
			}else{
				Title[Title.length-1].innerHTML = Rename[Rename.length-1].value;
				if(arr[arr.length-1].child){
					arr[arr.length-1].child[arr[arr.length-1].child.length-1].name = Rename[Rename.length-1].value;
				}else{
					arr[arr.length-1][arr[arr.length-1].length-1].name = Rename[Rename.length-1].value;
				}
				Title[Title.length-1].style.display = 'block';
				Rename[Rename.length-1].style.display = 'none';
			}
		}
		
	}
	
	//制作导航栏
	nav();
	function nav(){
		var str = '<li><a href="">'+'微云'+'</a></li>';
		for(var i = 1; i < arr.length; i++){
			str += '<li><span>'+'>'+'</span><a href="">'+arr[i].name+'</a></li>';
		}
		Floder_nav.innerHTML = str;
		for(var i = 0; i < Floder_li.length - 1; i++){
			Floder_li[i].index = i;
			Floder_li[i].onclick = function(){
				delF.length = 0;
				arr.splice(this.index+1);
				if(arr[arr.length-1].child){
					addFolder(arr[arr.length-1].child);
				}else{
					addFolder(arr[arr.length-1]);
				}
				nav();
				num = 0;
				doTool();
				return false;
			}
		}
		Floder_li[Floder_li.length - 1].onclick = function(){
			return false;
		}
	}
	
	//全选按钮(文件夹控制全选按钮)
	function allSelect(){
		for (var i = 0; i < unChoose.length; i++) {
			if(unChoose[i].onOff == false){
				cancelSelect(AllSelect,AllSelect,'allSelect');
				return false;
			}
		}
		checkSelect(AllSelect,AllSelect,'allSelect T');
	}
	//全选按钮控制文件夹
	function allTF(){
		delF.length = 0;
		for(var i = 0; i < unChoose.length; i++){
			if(AllSelect.onOff == true){
				num = unChoose.length;
				checkSelect(unChoose[i],Floders[i],'unchoose True');
				checkSelect(AllSelect,AllSelect,'allSelect T');
				if(arr[arr.length-1].child){
					if(unChoose[i].onOff == true){
						delF.push(arr[arr.length-1].child[i].id);
					}
				}else{
					if(unChoose[i].onOff == true){
						delF.push(arr[arr.length-1][i].id);
					}
				}
			}else{
				delF.length = 0;
				num = 0;
				cancelSelect(unChoose[i],Floders[i],'unchoose');
				cancelSelect(AllSelect,AllSelect,'allSelect');
			}
			doTool();
		}
	}
	function checkSelect(ele,ele1,css){
		ele.onOff = true;
		ele.className = css;
		if(ele != AllSelect){
			ele.style.display = 'block';
		}
		if(ele1 == AllSelect){
			ele1.style.outline = '2px solid #3b95ff';
		}else{
			ele1.style.outline = '1px solid #3b95ff';
			ele1.style.border = '1px solid #3b95ff'
		}
	}
	function cancelSelect(ele,ele1,css){
		ele.onOff = false;
		ele.className = css;
		if(ele != AllSelect){
			ele.style.display = 'none';
		}
		if(ele1 == AllSelect){
			ele1.style.outline = '2px solid #cdcfd1';
		}else{
			ele1.style.outline = '0px solid #3b95ff';
			ele1.style.border = '1px solid #d5d7df';
		}
	}
	//取消全选按钮的选中状态。
	function cancelAllS(){
		delF.length = 0;
		AllSelect.onOff = false;
		AllSelect.className = 'allSelect';
	}
	
	//操作界面的显示问题
	function doTool(){
		if(num == 0){
			Tool.style.display = 'none';
		}else{
			Tool.style.display = 'block';
			Snum.innerHTML = '选择了'+num+'项';
		}
	}
	
	//菜单式文件夹

	function createmenu(ppa,datas){
		datas.forEach(function(a){
			addmenu(ppa,a);
		})
	}	
	
	function addmenu(ppa,data){
		if(data.fileType != 'folder'){
			return;
		}
		var menu = document.createElement('li');
		var div = document.createElement('div');
		div.className = 'menu';
		div.style.paddingLeft = '8px';
		menu.onOff = false;
		menu.onclick = function(ev){
			move = true;
			Make.className = 'make';
			ev.cancelBubble = true;
			Info.innerHTML = '';
			if(this.onOff == false){
				if(this.childNodes[1]){
					this.childNodes[0].childNodes[0].className = 'ico_open';
					this.childNodes[1].style.display = 'block';
					for(var j = 0; j < this.childNodes[1].childNodes.length; j++){
						this.childNodes[1].childNodes[j].childNodes[0].style.paddingLeft = parseFloat(this.childNodes[0].style.paddingLeft)+18+'px';
					}
				}
			}else{//bug 只能关闭下面一层子菜单，不能关闭所有的子菜单						
				if(this.childNodes[1]){
					this.childNodes[0].childNodes[0].className = 'ico_close';
					this.childNodes[1].style.display = 'none';
					for(var j = 0; j < this.childNodes[1].childNodes.length; j++){
						this.childNodes[1].childNodes[j].childNodes[0].style.paddingLeft = '8px';
					}
				}
			}
			this.onOff = !this.onOff;
			
			checkMove(data);
			function checkMove(data){
				//点击的文件夹或者点击文件夹的一级子文件夹不能与选中的文件夹相同
				for (var j = 0; j < delF.length; j++) {
					if(delF[j] == data.id){
						Info.innerHTML = '不能将文件移至自身或其子文件夹下';
						move = false;
						Make.className = 'make F';
						return;
					}
				}
				data.child.forEach(function(a){
					for (var i = 0; i < delF.length; i++) {
						if(delF[i] == a.id){
							Info.innerHTML = '文件已经在该文件夹下了';
							debugger
							move = false;
							Make.className = 'make F';
							return;
						}
					}
				})
			}
			
			//生成导航栏菜单
			openFolders.innerHTML = '';
			findPa(data);
			//点击确定移动事件
			if(move == true){
				Make.onclick = function(){
					if(arr[arr.length-1].child){
						for(var l = 0; l < arr[arr.length-1].child.length; l++){
							for(var a = 0; a < delF.length; a++){
								if(arr[arr.length-1].child[l].id == delF[a]){
									arr[arr.length-1].child[l].pid = data.id;
									data.child.push(arr[arr.length-1].child[l]);
									arr[arr.length-1].child.splice(l,1);
								}
							}
						}
					}else{
						for(var l = 0; l < arr[arr.length-1].length; l++){
							for(var a = 0; a < delF.length; a++){
								if(arr[arr.length-1][l].id == delF[a]){
									arr[arr.length-1][l].pid = data.id;
									data.child.push(arr[arr.length-1][l]);
									arr[arr.length-1].splice(l,1);
								}
							}
						}
					}
					Hidden.onclick();
					if(arr[arr.length-1].child){
						addFolder(arr[arr.length-1].child);
					}else{
						addFolder(arr[arr.length-1]);
					}
					delF.length = 0;
					num = 0;
					doTool();
					Make.onclick = null;
				}
			}
		}
		div.innerHTML = '<span></span><span>'+data.name+'</span>';
		menu.appendChild(div);
		ppa.appendChild(menu);
		
		if(arr[arr.length-1].child){
			for (var i = 0; i < arr[arr.length-1].child.length; i++) {
				if(arr[arr.length-1].child[i].id == delF[0]){
					Folder_name.innerHTML = arr[arr.length-1].child[i].name;
				}
			}
		}else{
			for (var i = 0; i < arr[arr.length-1].length; i++) {
				if(arr[arr.length-1][i].id == delF[0]){
					Folder_name.innerHTML = arr[arr.length-1][i].name;
				}
			}
		}
		
		if(delF.length >= 2){
			Over.innerHTML = '等'+delF.length+'个文件';
		}else{
			Over.innerHTML = '';
		}
		if(data.child.length != 0){
			menu.childNodes[0].childNodes[0].className = 'ico_close';
			menus = document.createElement('ul');
			menu.appendChild(menus);
			menu.childNodes[1].style.display = 'none';
			createmenu(menus,data.child);
		}
		//点击添加背景
		for (var i = 0; i < childMenu.length; i++) {
			childMenu[i].index = i;
			var old = childMenu[0].childNodes[0];
			childMenu[i].addEventListener('click',active,false);
			function active(ev){
				ev.cancelBubble = true;
				old.className = 'menu';
				this.childNodes[0].className = 'menu active';
				old = this.childNodes[0];
			}
		}
	}
	
	//寻找父级并生成菜单
	function findPa(data){
		var Li = document.createElement('li');
		Li.innerHTML = data.name;
		if(openFolders.childNodes[0]){
			openFolders.insertBefore(Li,openFolders.childNodes[0])
		}else{
			openFolders.appendChild(Li);
		}
		if(data.pid != 0){
			allSee(database);
			function allSee(datas){
				datas.forEach(function(a){
					if(a.id != data.pid){
						if(a.child){
							allSee(a.child)
						}
					}else{
						if(a.id == data.pid){
							for(var k = 0; k < delF.length; k++){
								//点击的文件夹不能是选中的文件夹的子级文件夹
								if(delF[k] == a.id){
									Info.innerHTML = '不能将文件移至自身或其子文件夹下';
									move = false;
									Make.className = 'make F';
								}
							}
							return findPa(a);
						}
					}
				})
			}
		}else{
			return;
		}
	}
	
	function del(){
		if(arr[arr.length-1].child){
			for(var l = 0; l < arr[arr.length-1].child.length; l++){
				for(var a = 0; a < delF.length; a++){
					if(arr[arr.length-1].child[l].id == delF[a]){
						delFed.push(arr[arr.length-1].child[l]);
						arr[arr.length-1].child.splice(l,1);
						l--;
					}
				}
			}
		}else{
			for(var l = 0; l < arr[arr.length-1].length; l++){
				for(var a = 0; a < delF.length; a++){
					if(arr[arr.length-1][l].id == delF[a]){
						delFed.push(arr[arr.length-1][l]);
						arr[arr.length-1].splice(l,1);
						l--;
					}
				}
			}
		}
		Del_hidden.onclick();
	}
	
	//拖动框
	drag(Move_del,Del);
	drag(Move_move,Move);
	
	function drag(obj,obj1){
		obj.onmousedown = function(ev){
			var posX = ev.clientX - obj1.offsetLeft;
			var posY = ev.clientY - obj1.offsetTop;
			console.log(ev.clientX,posX)
			document.onmousemove = function(ev){
				var X = ev.clientX - posX;
				var Y = ev.clientY - posY;
				if(X <= 0){
					X = 0;
				}
				if(Y <= 0){
					Y = 0;
				}
				obj1.style.left = X +'px';
				obj1.style.top = Y + 'px';
			}
			obj.onmouseup = function(){
				document.onmousemove = null;
			}
		}
	}