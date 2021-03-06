class ArticleView {
    constructor(selector, mainContentSelector) {
        this._selector = selector;
        this._mainContentSelector = mainContentSelector;
    }

    showCreateArticlePage(data) { // Create Article template
        let _that = this;
        let templateUrl = "templates/nav-create-article.html";

        $.get(templateUrl, function (template) {
            let navSelector = Mustache.render(template, null);
            $(_that._selector).html(navSelector);
        });

        $.get('templates/form-create-article.html', function (template) {
            var renderMainContent = Mustache.render(template, null);
            $(_that._mainContentSelector).html(renderMainContent);

            $('#author').val(data.fullname);

            $('#create-new-article-request-button').on('click', function (ev) {
                let title = $('#title').val();
                let tag = $('#tag').val();
                let author = $('#author').val();
                let content = $('#content').val();
                let date = moment().format("MMMM Do YYYY,h:mm A");
                let data = {
                    title: title,
                    tag: tag,
                    author: author,
                    content: content,
                    date: date
                };
                $.get();
                triggerEvent('createArticle', data);
            });
        });
    }

    showSortedArticle(data) {//Sorts articles By Tag Name
        let _that = this;
        let theData = {
            sortedArticles: data
        };
        $.get('templates/articlesByTagName.html', function (template) {
            var renderMainContent = Mustache.render(template, theData);
            $(_that._mainContentSelector).html(renderMainContent);
        });
    }

    showSelectedArticle(article) { //Show the article which we want to see (incl. all comments)
        let _that = this;
        let theData = {
            selectedArticle: article,
            selectedArticleComments: article['commentsList']
        };
        $.get('templates/selected-article.html', function (template) {
            var renderMainContent = Mustache.render(template, theData);
            $(_that._mainContentSelector).html(renderMainContent);
        });
    }

    showEditArticlePage(data) {//Show the article which we want to edit 
        let _that = this;
        let templateUrl;
        let authToken = sessionStorage['_authToken'];
        if (authToken != null && authToken != 'undefined') {
            templateUrl = "templates/nav-user.html";
        }
        else {
            showPopup("error", "Please Login.");
            redirectUrl("#/login");
            return;
        }
        $.get(templateUrl, function (template) {
            let navSelector = Mustache.render(template, null);
            $(_that._selector).html(navSelector);
        });
        $.get('templates/form-edit-article.html', function (template) {

            var renderMainContent = Mustache.render(template, null);
            $(_that._mainContentSelector).html(renderMainContent);
            $('#article-author').val(sessionStorage.getItem('fullname'));
            document.getElementById('article-content').value = data.content;
            document.getElementById('article-title').value = data.title;
            let articleId = data._id;

            $('#edit-article-request-button').on('click', function (ev) {
                let tag = $('#tag').val();
                let authorName = sessionStorage.getItem("fullname");
                let date = moment().format("MMMM Do YYYY,h:mm A");
                let data = {
                    "title":  document.getElementById('article-title').value,
                    "author": authorName,
                    "content": document.getElementById('article-content').value,
                    "date": date,
                    "_id": articleId,
                    "tag": tag
                };
                triggerEvent('editArticle', data);
            })
        });
    }

}
