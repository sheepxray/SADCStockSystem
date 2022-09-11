//LiteLoaderScript Dev Helper
/// <reference path="C:\Users\Administrator\Documents\GitHub\HelperLib-master\src\index.d.ts"/> 

const { file } = require("../HelperLib-master/src/SystemAPI/File")

ll.registerPlugin(SADCStockSystem,"A system like stock in eco",[0,0,1], "https://github.com/sheepxray/SADCStockSystem")

//定义初始变量
var version = "0.0.1"
var config_version = "0.0.1"
var auto_Upgrade = true
//定义部分语言
let langtp = {
    "Get_NewVersion": "获取到云端版本{version_lastest}，正在更新...",
	"Get_NewVersion_Error": "获取最新版本异常",
	"UpdatePlugin_Successful":"成功更新 当前版本{version_lastest}"
}
//载入自动更新模块
if (auto_Upgrade == true) {
	network.httpGet('https://fastly.jsdelivr.net/gh/sheepxray/SADCStockSystem/version.json', function (st, dat) {
		if (st == 200) {
			let version_lastest = JSON.parse(dat).version
			if (version_lastest != Version) {
				log(lang.Get_NewVersion.replace("{version_lastest}", version_lastest))
				network.httpGet('https://fastly.jsdelivr.net/gh/sheepxray/SADCStockSystem/SADCStockSYS.lxl.js', function (st2, dat2) {
					if (st2 == 200) {
						let plugin = dat2.replace(/\r/g, '');
						file.writeTo("plugins/SADCStockSYS.lxl.js", plugin)
						log(lang.UpdatePlugin_Successful)
						mc.runcmdEx("ll reload SADCStockSYS.lxl.js")
					}
					else {
						log(lang.UpdatePlugin_Error)
					}
				})
			}
		}
		else {
			log(lang.Get_NewVersion_Error)
		}
	})
}

function read() {
	let r = file.createDir('plugins/SADCStockSystem')
	//配置文件生成
	let deploy = file.exists('plugins/SADCStockSystem/config.json');
	if (deploy) {
		try {
			tick = file.readFrom('plugins\\SADCStockSystem\\config.json');
			traab = JSON.parse(tick);
		}
		catch (err) {
			log("主配置文件出错")
			setconfig()
			tick = file.readFrom('plugins\\SADCStockSystem\\config.json');
			traab = JSON.parse(tick);
		}
	}
	else {
		setconfig()
		tick = file.readFrom('plugins\\SADCStockSystem\\config.json');
		traab = JSON.parse(tick);
	}
	let checkc = file.exists('plugins\\SADCStockSystem\\core.json')
	if (checkc){
		try{
			tickc = file.readFrom("plugins\\SADCStockSystem\\core.json")
			traaa = JSON.parse(tickc)
		}
		catch(err){
			log("物价表出错")
			setconfig2()
			tickc = file.readFrom("plugins\\SADCStockSystem\\core.json")
			traaa = JSON.parse(tickc)
		}
	}
}
	function setconfig() {
		let dataccq = { "配置文件版本号": config_version, "自动更新": true };
		let datacaa = JSON.stringify(dataccq, null, "\t");
		file.writeTo('plugins\\SADCStockSystem\\config.json', datacaa);
	}
	function setconfig2(){
		let datamo = { "粗铁":100,"粗铜":70,"煤":50,"粗金":150,"绿宝石":250,"下届合金锭":1500,"钻石":1000,"红石":30};
		let datamob = JSON.stringify(datamo,null,"\t");
		file.writeTo("plugins\\SADCStockSystem\\core.json', datacaa");
	}	
//写入主逻辑
function refresh(){
	
};
mc.listen("onServerStarted",Player=>{refresh()});
