// ==UserScript==
// @name         BJFU智慧课堂防暂停助手
// @namespace    http://www.cmd137blog.top/
// @version      0.1
// @description  自动检测并模拟鼠标活动，防止视频因长时间不动而暂停
// @author       CMD137
// @match        *://bjfu.smartclass.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 配置参数
    const CHECK_INTERVAL = 5000; // 每5秒检查一次
    const INACTIVITY_THRESHOLD = 20000; // 20秒无活动视为不活跃
    const SIMULATION_MOVEMENT = 1; // 模拟移动的像素值
    let lastActivityTime = Date.now();
    let isSimulating = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    // 记录鼠标活动
    document.addEventListener('mousemove', function(e) {
        lastActivityTime = Date.now();
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        isSimulating = false;
    });

    document.addEventListener('keydown', function() {
        lastActivityTime = Date.now();
        isSimulating = false;
    });

    // 检测并模拟活动
    setInterval(function() {
        const now = Date.now();
        const inactiveTime = now - lastActivityTime;

        if (inactiveTime >= INACTIVITY_THRESHOLD && !isSimulating) {
            simulateActivity();
        }
    }, CHECK_INTERVAL);

    // 模拟鼠标活动
    function simulateActivity() {
        isSimulating = true;

        // 微小移动鼠标
        const moveEvent = new MouseEvent('mousemove', {
            clientX: lastMouseX + SIMULATION_MOVEMENT,
            clientY: lastMouseY + SIMULATION_MOVEMENT,
            bubbles: true,
            cancelable: true,
            view: window
        });

        document.dispatchEvent(moveEvent);

        // 记录模拟活动时间
        lastActivityTime = Date.now();
        lastMouseX += SIMULATION_MOVEMENT;
        lastMouseY += SIMULATION_MOVEMENT;

        console.log('模拟鼠标活动，防止视频暂停');
        //alert("test....");
    }
})();
