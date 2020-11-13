let message = document.querySelector('#message');
let btn = document.querySelector('#btn');
let list = document.querySelector('#list');
let data = JSON.parse(localStorage.getItem('listData')) || [];
let content = document.querySelectorAll('content');
let all = document.getElementById('all');
let notyet = document.getElementById('notyet');
let finish = document.getElementById('finish');

btn.addEventListener('click', Saving);

function Saving(e) {
    e.preventDefault();
    let value = message.value.trim();     // trim()刪除空格
    if (value == '') {
        return;
    }
    let vueId = Math.floor(Date.now());
    let now = new Date();                                    // 加上新增訊息的日期
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    let newMessage = {
        vueId: vueId,
        arrt: '',
        ckecked: 0,
        decoration: 'none',
        name: value,
        time: `${year}/${month}/${date}，${hour}:${minute} `
    };

    data.push(newMessage);

    record(data);

    Printing(data);

    message.value = '';
}

all.addEventListener('click', function (e) {
    Printing(data)
});

window.addEventListener('load', function (e) {
    Printing(data);
})

notyet.addEventListener('click', function (e) {
    let notyetData = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].arrt == 'checked') {
            notyetData.push(data[i]);
        }
    }
    console.log(notyetData);
    Printing(notyetData);
});

finish.addEventListener('click', function (e) {
    let finishData = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].arrt == '') {
            finishData.push(data[i]);
        }
    }
    console.log(finishData);
    Printing(finishData);

})


function record(vau) {                                                 // 保存資料
    localStorage.setItem('listData', JSON.stringify(vau));
}


function Printing(vau) {                                               // 輸出呈現
    let str = '';
    for (let i = 0; i < vau.length; i++) {
        str += `<li id=${vau[i].vueId} class="list-group-item list-group-item-success row">
        <span class='col'><input type='checkbox' ${vau[i].arrt}>&emsp;&emsp;</span>
        <span class='content col' style='text-decoration:${vau[i].decoration};'>${vau[i].name}</span>
        <span class='time col'>&nbsp; &nbsp; ${vau[i].time}發布</span>
        <a href="#" class="close" data-num=${i}>&times;</a></li>`
    }
    list.innerHTML = str;
}


list.addEventListener('dblclick', contentChange);
function contentChange(e) {                                 // 修改內容
    console.log(e.target);
    console.log(e.target.className);
    if (e.target.className === 'content col') {
        console.log(e.target.parentNode.id);
        let result = prompt('修改內容', e.target.textContent).trim();
        if (result == '') {
            return e.target.textContent;
        }

        let vau = '';
        for (let i = 0; i < data.length; i++) {
            if (data[i].vueId == e.target.parentNode.id) {
                vau = i;
            }
        }

        data[vau].name = result;
        record(data);
        Printing(data);
    }
}


list.addEventListener('click', Delete);
function Delete(e) {
    e.preventDefault();
    if (e.target.textContent == '×') {                               // 刪除資料項
        let id = '';

        for (let j = 0; j < data.length; j++) {
            if (data[j].vueId == e.target.parentNode.id) {
                id = j;
            }
        }
        console.log(id);
        data.splice(id, 1);
        record(data);
        Printing(data);
    }

    if (e.target.type === 'checkbox') {                            // 完成的核取方塊
        //console.log(e.target.parentNode.parentNode.id);
        let index = '';
        for (let i = 0; i < data.length; i++) {
            if (data[i].vueId == e.target.parentNode.parentNode.id) {
                console.log(data[i]);
                index = i;
            }
        }
        console.log(index);

        data[index].ckecked = Number(data[index].ckecked) + 1;
        if ((data[index].ckecked % 2) == 1) {
            data[index].arrt = 'checked';
            data[index].decoration = 'line-through';            // 完成項目增加刪除線
        } else if ((data[index].ckecked % 2) == 0) {
            data[index].arrt = '';
            data[index].decoration = 'none';
        }
        record(data);
        Printing(data);
    };
}

message.addEventListener('keyup', function (e) {                    // enter輸入
    e.preventDefault();
    if (e.keyCode == 13) {
        btn.click();
    }
});