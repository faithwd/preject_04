$(function() {
    var myBox1 = echarts.init(document.querySelector('.box1'));
    var myBox2 = echarts.init(document.querySelector('.box2'));
    var myBox3 = echarts.init(document.querySelector('.box3'));
    var optionBox1 = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
        }]
    };

    var optionBox2 = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [{
                value: 1048,
                name: '搜索引擎'
            }, {
                value: 735,
                name: '直接访问'
            }, {
                value: 580,
                name: '邮件营销'
            }, {
                value: 484,
                name: '联盟广告'
            }, {
                value: 300,
                name: '视频广告'
            }]
        }]

    };
    var optionBox3 = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, {
                value: 200,
                itemStyle: {
                    color: '#a90000'
                }
            }, 150, 80, 70, 110, 130],
            type: 'bar'
        }]

    };
    myBox1.setOption(optionBox1);
    myBox2.setOption(optionBox2);
    myBox3.setOption(optionBox3)

})