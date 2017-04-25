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
var folderDel = Tool.getElementsByClassName('folder_del')[0];
var Snum = document.getElementsByClassName('snum')[0];
var Cancel = document.getElementsByClassName('cancel')[0];
var num = 0;

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
	var arr = [database];//打开文件的父及文件夹
	
	render(database);
	function render(data){
		Data.innerHTML = '';
		data.forEach(function(a){
			create(a);
		})
	}
	
	function create(obj){
		var Li = document.createElement('li');
		var bg = document.createElement('div');
		
		bg.className = obj.fileType;
		if(obj.name != ''){
			var title = document.createElement('div');
			title.className = 'title';
			title.innerHTML = obj.name;
			var Input = document.createElement('input');
			Input.type = 'text';
			Input.className = 'reName';
			Input.value = title.innerHTML;
		}else{
			var title = document.createElement('div');
			title.className = 'title';
			title.style.display = 'none';
			var Input = document.createElement('input');
			Input.type = 'text';
			Input.className = 'reName';
			Input.style.display = 'block';
			Input.onclick = function(ev){
				ev.cancelBubble = true;
			}
			document.onclick = function(){
				console.log(Input.value)
				if(Rename[Rename.length-1].value == ''){
					if (arr[arr.length-1].child) {
						arr[arr.length-1].child.pop();
						render(arr[arr.length-1].child);
					} else{
						arr[arr.length-1].pop();
						render(arr[arr.length-1]);
					}
					return;
				}
				title.innerHTML = Input.value;
				Input.style.display = 'none';
				title.style.display = 'block';
				obj.name = Input.value;
				document.onclick = null;
			}
			
		}
		
		var choose = document.createElement('div');
		choose.onOff = false;
		choose.className = 'unchoose';
		choose.onclick = function(ev){
			ev.cancelBubble = true;
			if(choose.onOff == false){
				this.className = 'unchoose True';
				num++;
			}else{
				this.className = 'unchoose';
				num--;
			}
			choose.onOff = !choose.onOff;
			allSelect();
			show();
		}
		Li.onmouseenter = function(){
			this.style.border = '1px solid #389cff';
			this.style.outline = '1px solid #389cff';
		}
		Li.onmouseleave = function(){
			if(choose.onOff){
				return
			}
			this.style.border = '1px solid #d5d7df';
			this.style.outline = '0 solid #389cff';
		}
		Li.onclick = function(ev){
			ev.cancelBubble = true;
			if(obj.child){
				num = 0;
				Tool.style.display = 'none';
				AllSelect.onOff = false;
				AllSelect.className = 'allSelect';
				render(obj.child);
				arr.push(obj);
				nav();
			}
		}
		
		Floder_li = Floder_nav.getElementsByTagName('a');
		Li.appendChild(bg);
		Li.appendChild(title);
		Li.appendChild(Input);
		Li.appendChild(choose);
		Data.appendChild(Li);
	}
	
	//生成新的文件夹
	Creat_folder.onclick = function(ev){
		ev.cancelBubble = true;
		var obj = {};
		obj.fileType = 'folder';
		obj.id = 'id:'+Math.random();
		obj.name = '';
		obj.child = [];
		if (arr[arr.length-1].child) {
			arr[arr.length-1].child.push(obj);
			render(arr[arr.length-1].child);
		} else{
			arr[arr.length-1].push(obj);
			render(arr[arr.length-1]);
		}
		Rename[Rename.length - 1].focus();
	}
	
	//生成菜单导航栏
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
				AllSelect.onOff = false;
				AllSelect.className = 'allSelect';
				arr.splice(this.index+1);
				if(arr[arr.length-1].child){
					render(arr[arr.length-1].child);
				}else{
					render(arr[arr.length-1]);
				}
				nav();
				return false;
			}
		}
		Floder_li[Floder_li.length - 1].onclick = function(){
			return false;
		}
	}
	
	//全选按钮
	AllSelect.onOff = false;
	AllSelect.onclick = function(){
		if(this.onOff == false){
			this.className = 'allSelect T';
			Tool.style.display = 'block';
			num = unChoose.length;
			Snum.innerHTML = '选择了'+num+'项';
		}else{
			this.className = 'allSelect';
			Tool.style.display = 'none';
			num = 0;
		}
		this.onOff = !this.onOff;
		checkSelect(this.onOff);
	}
	
	//根据文件的状态调整全选按钮的状态。
	function allSelect(){
		for (var i = 0; i < unChoose.length; i++) {
			if(unChoose[i].onOff == false){
				AllSelect.onOff = false;
				AllSelect.className = 'allSelect';
				return false;
			}
		}
		AllSelect.onOff = true;
		AllSelect.className = 'allSelect T';
	}
	
	//根据全选按钮的状态调整文件夹的选中状态。
	function checkSelect(a){
		if(a){
			for(var i = 0; i < unChoose.length; i++){
				unChoose[i].onOff = true;
				unChoose[i].className = 'unchoose True';
				Floders[i].style.border = '1px solid #389cff';
				Floders[i].style.outline = '1px solid #389cff';
			}
		}else{
			for(var i = 0; i < unChoose.length; i++){
				unChoose[i].onOff = false;
				unChoose[i].className = 'unchoose';
				Floders[i].style.border = '1px solid #d5d7df';
			 	Floders[i].style.outline = '0px solid #389cff';
			}
		}
	}
	//文件夹操作的控制
	function show(){
		if(num == 0){
			Tool.style.display = 'none';
		}else{
			Tool.style.display = 'block';
			Snum.innerHTML = '选择了'+num+'项';
		}
	}
	
	//取消按钮
	Cancel.onclick = function(){
		num = 0;
		for(var i = 0; i < unChoose.length; i++){
			unChoose[i].onOff = false;
			unChoose[i].className = 'unchoose';
			Floders[i].style.border = '1px solid #d5d7df';
			Floders[i].style.outline = '0px solid #389cff';
		}
		AllSelect.onOff = false;
		AllSelect.className = 'allSelect';
		Tool.style.display = 'none';
	}
