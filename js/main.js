/*
 * @Author:             ZHANG Kai
 * @Date:               2018-10-05 16:06:01
 * @Last Modified by:   ZHANG Kai
 * @Last Modified time: 2018-11-14 14:36:34
 */

$(function () {
    $.ajax({
        url: 'js/url.json',
        type: 'GET',
        cache: false,
        dataType: 'json',
    })
    .done(function(data) {
        console.log(data);
        constructDOM(data);
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
    
})

function constructDOM(obj) {

    Object.entries(obj).forEach(
        ([key, value]) => {
            /* Contruct section DOM with id and class */
            let setSection = `<section id="${key}" class="${key}">
                                    <div class="grid-container"></div>
                              </section>`;
            $('main').append(setSection);

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
                let getWebTitle = value.web_title;
                let getUrl = value.web_url;
                let setGridItem = `<div><a href="${getUrl}" title="${getUrl}">${getWebTitle}</a></div>`;
                $(`#${key} .grid-container`).append(setGridItem);
            }
            
            /*Change 'grid-row-end' CSS property for .grid-title */
            let titleRowEnd = Math.ceil(getWebsite.length / 6) + 1;
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
            })
            .on('click', function() {   //add click function for confirm button
                $('.popup').css('display', 'none');                
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
    let containerWidth = $('.container').width();
    
    let windowScrollY = window.scrollY;     // Get dynamic window scrollY 

    let scrollBarWidth = windowScrollY / (htmlHeight - windowInnerHeight) * containerWidth + 'px';   // Calculate scroll bar width

    $('.scroll-bar').width(scrollBarWidth);
});
