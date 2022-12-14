const newsList = document.querySelector('.center-content'),
    timeDisplay = document.querySelector('.time-display'),
    sideBarButton = document.querySelector('.show-side-bar-icon'),
    avatarName = document.querySelector('.avatar-name'),
    sideBar = document.querySelector('.left-content'),
    settingButton = document.querySelector('.setting-icon'),
    fontPicker = document.querySelector('.font-picker');

sideBarButton.addEventListener('click', () => {
    if (!hasClass(sideBar, 'side-bar-toggle'))
    {
        if(!hasClass(fontPicker, 'font-picker-toggle')){
            fontPicker.classList.toggle('font-picker-toggle');
        }
    }
    if (hasClass(sideBar, 'side-bar-toggle'))
    {
        if(hasClass(fontPicker, 'font-picker-toggle')){
            fontPicker.classList.toggle('font-picker-toggle');
        }
    }
    sideBar.classList.toggle('side-bar-toggle');
    avatarName.classList.toggle('avatar-name-toggle')
    sideBarButton.setAttribute('src',
    hasClass(sideBar, 'side-bar-toggle')? './icon/left.png' : './icon/right.png')
});

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

function changeFont() {
    var font = fontPicker.value;
    console.log(font);
    document.body.style.fontFamily = font;
}


var asd = 0;
createNode = (data) => {
    news_div = document.createElement('div');
    news_div.className = 'news';

    title_href = document.createElement('a');
    title_href.className = 'link';
    title_href.setAttribute('href', data[2]);

    news_title = document.createElement('b');
    news_title.className = 'title';
    news_title.innerText = data[0];

    title_href.appendChild(news_title);

    news_description = document.createElement('p');
    news_description.className = 'description';
    news_description.innerText = data[1];

    news_href = document.createElement('a');
    news_href.className = 'link';
    news_href.setAttribute("href", data[2]);

    news_href.appendChild(news_description);

    news_div.appendChild(title_href);
    news_div.appendChild(news_href);

    newsList.appendChild(news_div)
}

news.forEach(data => {
    createNode(data);
});

setTime = () => {
    const today = new Date();

    var seconds = (today.getSeconds().toString().length < 2) ? "0" + today.getSeconds() : today.getSeconds();
    var minutes = (today.getMinutes().toString().length < 2) ? "0" + today.getMinutes() : today.getMinutes();
    var hours = (today.getHours().toString().length < 2) ? "0" + today.getHours() : today.getHours();
    var dd = (today.getDate().toString().length < 2) ? "0" + today.getDate() : today.getDate();
    var mm = ((today.getMonth() + 1).toString().length < 2) ?
        "0" + (today.getMonth() + 1) : (today.getMonth() + 1);
    var yyyy = today.getFullYear();

    timeDisplay.innerText = hours + ":" + minutes + ":" + seconds + " " + dd + "/" + mm + "/" + yyyy;
    requestAnimationFrame(setTime);
}