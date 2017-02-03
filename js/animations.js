/**
 * Created by tanner on 2/2/17.
 */
Date.prototype.tweetTime = function ()
{
    var date = new Date();
    var am = date.getHours() < 13;
    var hour = (am ? date.getHours() : date.getHours() - 12);
    var time = hour + ":" + date.getMinutes() + " " + (am ? "AM" : "PM");
    var day = date.getDay() + " " + this.shortMonthName[(date.getMonth() + 1)] + " " + (date.getFullYear() % 100);
    return time + " - " + day;
};
Date.prototype.shortMonthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

$(document).ready(function ()
{
    var tweetTextBox = $('#tweet-text-box');
    var tweetSubmit = $('#tweet-submit');
    tweetTextBox.on('focus', function ()
    {
        $("#tweet-content *").css('visibility', 'visible');
        $(this).height($(this).height() * 2)
    });
    tweetTextBox.on('input', function (element)
    {
        var leftover = 140 - $(this).val().length;
        var charCount = $('#char-count');
        charCount.text(leftover);
        charCount.css("color", leftover < 10 ? "red" : "#999");
        tweetSubmit.prop("disabled", leftover < 0);
    });
    tweetSubmit.on("click", function ()
    {
        submitTweet("Your Name Here", "@yourname", tweetTextBox.val());
    });
});

function submitTweet(fullname, username, message)
{
    var tweetContent =
        '<div class="tweet">' +
        '<div class="content">' +
        '<img class="avatar" src="img/alagoon.jpg" />' +
        '<strong class="fullname">' + fullname + ' </strong>' +
        '<span class="username">' + username + '</span>' +
        '<p class="tweet-text">' + message + '</p>' +
        '<div class="tweet-actions">' +
        '<ul>' +
        '<li><span class="icon action-reply"></span> Reply</li>' +
        '<li><span class="icon action-retweet"></span> Retweet</li>' +
        '<li><span class="icon action-favorite"></span> Favorite</li>' +
        '<li><span class="icon action-more"></span> More</li>' +
        '</ul>' +
        '</div>' +
        '<div class="stats">' +
        '<div class="retweets">' +
        '<p class="num-retweets">0</p>' +
        '<p>RETWEETS</p>' +
        '</div>' +
        '<div class="favorites">' +
        '<p class="num-favorites">1</p>' +
        '<p>FAVORITES</p>' +
        '</div>' +
        '<div class="users-interact">' +
        /*    '<div>' +
         '<img src="img/damenleeturks.jpg" />' +
         '<img src="img/vklimenko.jpg" />' +
         '</div>' +*/
        '</div>' +
        '<div class="time">' +
        new Date().tweetTime() +
        '</div>' +
        '</div>' +
/*        '<div class="reply">' +
        '<img class="avatar" src="img/alagoon.jpg" />' +
        '<textarea class="tweet-compose" placeholder="Reply to "' + username + '/></textarea>' +
        '</div>' +*/
        '</div>' +
        '</div>';

    $('#stream').prepend(tweetContent);
}