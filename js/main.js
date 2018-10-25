/*
 * @Author: Zhang Kai;
 * @Date: 2018-10-05 16:06;
 * @Last Modified by: Zhang Kai;
 * @Last Modified time: ;
 */

$(function() {
    /* Create XMLHttpRequest object*/
    let xhr = window.XMLHttpRequest? new XMLHttpRequest(): new ActiveXObject('Microsoft.XHMHTTP');

    xhr.open('GET', 'js/url.json');

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let obj = JSON.parse(xhr.responseText);
            console.log(obj);
            constructDOM(obj);
        }
    }
    xhr.send(null);

});

function constructDOM(obj) {

    Object.entries(obj).forEach(
        ([key, value]) => {
            /* Contruct section DOM with id and class */
            let setSection = `<section id="${key}" class="${key}">
                                    <div class="grid-container"></div>
                              </section>`;
            $('div.content').append(setSection);

            /* Grid Title */
            let getTitle = value.title;
            let setTitle = `<span>${getTitle}</span>`;
            let getIcon = value.icon;
            let setIcon = `<img src="${getIcon}" alt="">`;
            let setGridTitle = `<div class="grid-title">${setIcon}${setTitle}</div>`;
            $(`#${key} .grid-container`).append(setGridTitle);

            /* Grid items */
            let getWebsite = value.website;
            for (value of getWebsite) {
                let getWebTitle = value.webTitle;
                let getUrl = value.url;
                let setGridItem = `<div><a href="${getUrl}">${getWebTitle}</a></div>`;
                $(`#${key} .grid-container`).append(setGridItem);
            }
            
            /*Change 'grid-row-end' CSS property for .grid-title */
            let titleRowEnd = Math.ceil(Object.keys(getWebsite).length / 6) + 1;
            $(`#${key} .grid-title`).css('grid-row-end', titleRowEnd.toString());
        });
    
    /* Add some useful path for McD General section */
    $(function() {
        let setMcdPath = `<div class="non-a">ajaxReloadAppConfig.json</div>
                          <div class="non-a">WOS-RESTS/v2/content/settings</div>
                          <div class="non-a">reloadAppConfig</div>`;
    
        $('#mcd .grid-container').append(setMcdPath);
    });
    
    /* Add target="_blank" for all <a> tag */
    $(function() {
        $('a').attr('target', '_blank');
    });

    /* Add confirmation alert for "PROD" url*/
    $(function () {
        $(`a:contains('PROD')`).on('click', function (e) {
            e.preventDefault();

            $('.popup').css('display', 'block');    //show popup

            let url = $(this).attr('href');     //get url

            $('.confirm-btn').attr({    //add href for confirm button
                'href': url,
                'target': '_blank'
            });
            
            $('.cancel-btn').on('click', function() {   //add click function for cancel button
                $('.popup').css('display', 'none');                
            });
        });

    });
}

/* add dynamic scroll bar */
$(window).scroll(function() {
    let htmlHeight = $('html').height();
    let windowInnerHeight = window.innerHeight;
    let windowInnerWidth = $('.container').width();
    
    let windowScrollY = window.scrollY;     // Get dynamic window scrollY 

    let scrollBarWidth = windowScrollY / (htmlHeight - windowInnerHeight) * windowInnerWidth + 'px';   // Calculate scroll bar width

    $('.scroll-bar').width(scrollBarWidth);
});
