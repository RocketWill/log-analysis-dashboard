export const staticScatterplotData = () => {
    //數據格式：[橫軸(時間), 縱軸(數量), [事件列表]]
    //參考文檔：https://echarts.baidu.com/examples/editor.html?c=bubble-gradient
    let report1 = [
        [new Date("2017/11/13 22:00:00"),55,[
            "WINDOWS_FILE:Execute[system].dll",
            "WINDOWS_FILE:Execute[system].dll",
            "WINDOWS_FILE:Execute[system].dll",
            "WINDOWS_FILE:Execute[system].dll",
            "WINDOWS_FILE:Write[appdata (local)].db",
            "WINDOWS_FILE:Write[appdata (local)].db",
            "WINDOWS_FILE:Execute[internet explorer].dll"
        ]],
        [new Date("2017/11/13 23:00:00"),25,[
            "WINDOWS_FILE:Execute[system].dll",
            "WINDOWS_FILE:Execute[system].dll",
            "WINDOWS_FILE:Write[appdata (local)].db",
            "WINDOWS_FILE:Write[appdata (local)].db",
            "WINDOWS_FILE:Execute[internet explorer].dll"
        ]],
        [new Date("2017/11/15 23:30:00"),56,[
            "WINDOWS_FILE:Execute[system].dll",
            "WINDOWS_FILE:Execute[system].dll",
            "WINDOWS_FILE:Execute[system].dll",
            "WINDOWS_FILE:Execute[system].dll",
        ]]
    ];
    
    let report2 = [
        [new Date("2017/11/12 12:00:00"),20, [
            "WINDOWS_FILE:Write[windows error reporting report queue]",
            "WINDOWS_FILE:Permissions[program data]",
            "WINDOWS_FILE:Write[program data]",
            "WINDOWS_FILE:Deleting edited file"
        ]],
        [new Date("2017/11/13 10:00:00"),15, [
            "WINDOWS_FILE:Write[windows error reporting report queue]",
            "WINDOWS_FILE:Permissions[program data]",
            "WINDOWS_FILE:Write[program data]",
            "WINDOWS_FILE:Deleting edited file"
        ]],
        [new Date("2017/11/13 23:30:00"), 5, [
            "WINDOWS_FILE:Write[windows error reporting report queue]",
            "WINDOWS_FILE:Permissions[program data]",
            "WINDOWS_FILE:Write[program data]",
            "WINDOWS_FILE:Deleting edited file"
        ]]
    ];
    
    let report3 = [
        [new Date("2017/11/9 12:00:00"),22, [                
            "WINDOWS_FILE:Execute[system].dll",
            "WINDOWS_FILE:Execute[system].dll",
            "WINDOWS_FILE:Execute[system].exe",
            "WINDOWS_PROCESS:Spawn[system].exe",
            "WINDOWS_FILE:Execute[system].dll",
            "WINDOWS_REGISTRY:Modify[registry (machine)]",
            "WINDOWS_PROCESS:Close"
        ]],
        [new Date("2017/11/13 03:00:00"),5, [                
            "WINDOWS_FILE:Execute[system].dll",
            "WINDOWS_FILE:Execute[system].dll",
            "WINDOWS_FILE:Execute[system].exe",
            "WINDOWS_PROCESS:Spawn[system].exe",
            "WINDOWS_FILE:Execute[system].dll",
            "WINDOWS_REGISTRY:Modify[registry (machine)]",
            "WINDOWS_PROCESS:Close"
        ]],
        [new Date("2017/11/15 13:30:00"),45, [                
            "WINDOWS_FILE:Execute[system].dll",
            "WINDOWS_FILE:Execute[system].dll",
            "WINDOWS_FILE:Execute[system].exe",
            "WINDOWS_PROCESS:Spawn[system].exe",
            "WINDOWS_FILE:Execute[system].dll",
            "WINDOWS_REGISTRY:Modify[registry (machine)]",
            "WINDOWS_PROCESS:Close"
        ]]   
    ];

    return ({report1, report2, report3});
}