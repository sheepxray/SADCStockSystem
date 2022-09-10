//LiteLoaderScript Dev Helper
/// <reference path="C:\Users\Administrator\Documents\GitHub\HelperLib-master\src\index.d.ts"/> 

ll.registerPlugin(SADCStockSystem,"A system like stock in eco",[0,0,1], "https://github.com/sheepxray/SADCStockSystem")

//定义初始变量
var version = "0.0.1"
var config_version = "0.0.1"
var auto_Upgrade = true
//载入自动更新模块
if (auto_Upgrade == true) {
	network.httpGet('https://gitee.com/sheepxray/SADCHunter/raw/master/version.json', function (st, dat) {
		if (st == 200) {
			let version_lastest = JSON.parse(dat).version
			if (version_lastest != Version) {
				log(lang.Get_NewVersion.replace("{version_lastest}", version_lastest))
				network.httpGet('https://gitee.com/sheepxray/SADCHunter/raw/master/SADCHunter.lxl.js', function (st2, dat2) {
					if (st2 == 200) {
						let plugin = dat2.replace(/\r/g, '');
						file.writeTo("plugins/SADCHunter.js", plugin)
						log(lang.UpdatePlugin_Successful)
						mc.runcmdEx("lxl reload SADCHunter.js")
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