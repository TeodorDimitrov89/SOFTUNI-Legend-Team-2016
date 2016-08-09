class ArticleView {
    constructor(wrapperSelector,mainContentSelector) {
        this._wrapperSelector = wrapperSelector;
        this._mainContentSelector = mainContentSelector;
    }

    showCreateArticlePage(data, isLoggedIn) {
        let _that = this;
        let templateUrl;
        if(isLoggedIn) {
            templateUrl = "templates/form-user.html";
        }
        else {
            templateUrl = "templates/form-guest.html";
        }

        $.get(templateUrl, function (template) {
            let renderedWrapper = Mustache.render(template,null);
            $(_that._mainContentSelector).html(renderedWrapper);

            $.get('templates/create-article.html', function (template) {
                var renderedContent = Mustache.render(template, null);
                $(_that._wrapperSelector).html(renderedContent);

                $('#author').val(data.fullname);

                $('#create-new-article-request-button').on('click', function (ev) {
                    let title = $('#title').val();
                    let author = $('#author').val();
                    let content = $('#content').val();
                    let date = moment().format("MMMM Do YYYY");
                    let data = {
                        title:title,
                        author:author,
                        content:content,
                        date:date
                    };
                    triggerEvent('createArticle', data);
                })
            });
        });
    }
}