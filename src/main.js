const $list = $('.board-list')
const $lastLi = $list.find('li.last')
const defaultList = [
    {
        logo: 'G',
        url: 'http://google.com'
    },
    {
        logo: 'G',
        url: 'http://github.com'
    },
]
const boardListString = localStorage.getItem('BoardList')
const boardListObject = JSON.parse(boardListString)
let boardList = boardListObject || defaultList

refresh()

// 添加按钮加点击事件
$('.board-add')
    .on('click', (e) => {
        let urlTmp = window.prompt('给个网址吧~')
        if (urlTmp.indexOf('http://') !== 0 && urlTmp.indexOf('https://') !== 0) {
            urlTmp = 'https://' + urlTmp
        }

        const node = {
                        logo: simplifyUrl(urlTmp)[0].toUpperCase(),
                        url: urlTmp
                     }
        boardList.push(node)
        addBoard(node, boardList.length - 1)
    })

// 退出页面时保存页签
window.onbeforeunload = () => { 
    const boardListString = JSON.stringify(boardList)
    localStorage.setItem('BoardList', boardListString)
}

// 按下按键打开相应的网站
$(document)
    .on('keypress', (e) => {
        const {key} = e
        boardList.forEach((node) => {
            if (node['logo'].toLowerCase() === key) {
                window.open(node['url'])
            }
        })
    })

// 添加一个网站方块
function addBoard(node, index) {
    const $newLi = $(`<li>
                        <div class="board-common">
                            <div class="logo">${node['logo']}</div>
                            <div class="link">${simplifyUrl(node['url'])}</div>
                            <svg class="close" aria-hidden="true">
                                <use xlink:href="#icon-close"></use>
                            </svg>
                        </div>
                    </li>`).insertBefore($lastLi)
    
    // 方块的点击事件
    $newLi.on('click', (e)=> {
        window.open(node['url'])
    })
    
    // 方块的删除按钮
    $newLi.on('click', '.close', (e)=> {
        e.stopPropagation()
        boardList.splice(index, 1)
        refresh()
    })
}

function refresh() {
    $list.find('li:not(.last)').remove()
    boardList.forEach((node, index) => {
        addBoard(node, index)
    })
}

function simplifyUrl(url) {
    return url.replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 删除 / 开头的内容
}