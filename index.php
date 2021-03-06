﻿<?php  
 echo('here');
 header("Access-Control-Allow-Origin:*");
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
        <link rel="stylesheet" href="css/animate.min.css">
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <link href="css/ui.progress-bar.css" rel="stylesheet" type="text/css" />
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    
    </head>
    <body onload="init();" ontouchstart="">
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
        <div id="page-start" class="page current-page">
	        <div class="header-container">
	            <header class="wrapper clearfix">
	                <h1 class="title">疯狂猜图</h1>
	            </header>
	        </div>
	
	        <div class="main-container">
	            <div class="main wrapper clearfix">
	            	<article>
	            		<div id="start-icon">
		                    <div id="start-level">
		                    0
		                    </div>
	                    </div>
	            	</article>
	            	<aside class="loading">
	                    <a id="start-btnPlay" class="btn btn-success btn-big">
	                    Play
	                    </a>
	            	</aside>
	
	            </div> <!-- #main -->
	        </div> 

	        <div class="footer-container">
	            <footer class="wrapper">
	            </footer>
	        </div>
        </div><!-- #page-start -->
        <div id="page-play" class="page none">
	        <div class="header-container">
	            <header class="wrapper clearfix">
	                <a id="play-level">
		                    0
		            </a>
	            </header>
	        </div>
	
	        <div class="main-container">
	            <div class="main wrapper clearfix">
	            	<div id="questions">

	            	</div>
	            </div> <!-- #main -->
	        </div> 
	        <div id="play-success">
	        	<div class="main wrapper clearfix">
	        		<section id="play-success-title">答案正确</section>
	        		<section id="play-success-level">100</section>
	        		<section id="play-success-answer">CORONA</section>
	        		<section id="play-success-action">
	        			<a id="play-success-next" class="btn btn-success">下一题</a>
	        			<a id="play-success-share" class="btn btn-info">分享</a>
	        			
	        			<div class="share-friend m-t-4" style="display:none;">
    <a id="J_ShareToFriend" class="ios-button clearfix" href="javascript:void(0);" data-link="链接地址" data-title="分享的标题" data-desc="分享的描述" data-img="图片地址" >
        <i class="icon2-friend m-t--5 m-r-5"></i>分享到朋友圈
    </a>
    
</div>
	        		</section>
	        	</div>
	        </div>
        </div><!-- #page-play -->

        <div id="page-preload" class="page none">
        	<div class="header-container">
	            <header class="wrapper clearfix">
	                <h1 class="title">疯狂猜图</h1>
	            </header>
	        </div>
	         <div class="main-container">
	            <div class="main wrapper clearfix">
		        	<div id="preload-ad">
		            	<img  src="img/bannerAds.png" />
		        	</div>
		        	<div id="progress_bar_container">
		            <div id="progress_bar" class="ui-progress-bar ui-container">
		                <div class="ui-progress" style="display:none;">
		                <span class="ui-label" style="display:none;">Processing <b class="value"></b></span>
		                </div><!-- .ui-progress -->
		            </div><!-- #progress_bar -->
		        	</div>
	            </div>
        </div>
            <!--#page-preload  -->

        <script src="js/vendor/jquery-1.9.1.min.js"></script>
        <script src="js/vendor/mustache.js" type="text/javascript"></script>
        <script src="js/libs/webtoolkit.sprintf.js" type="text/javascript"></script>
        <script src="js/Util.js" type="text/javascript"></script>
        <script src="http://code.createjs.com/preloadjs-0.3.1.min.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/ptwUI.js" type="text/javascript"></script>
        <script src="js/State.js" type="text/javascript"></script>
        <script src="js/Question.js" type="text/javascript"></script>
        <script src="js/PreloadState.js" type="text/javascript"></script>
        <script src="js/MenuState.js" type="text/javascript"></script>
        <script src="js/InGameState.js" type="text/javascript"></script>
        <script src="js/Controller.js" type="text/javascript"></script>
        <script>
            var controller;
            var canvas;
            function init() {
                ptwUI.init();
                canvas = $("#container");
                controller = new Controller(canvas);
                ptwUI.controller = controller;
                controller.startGame();
                SM.RegisterState("preload", PreloadState);
                SM.RegisterState("menu", MenuState);
                SM.RegisterState("inGame", InGameState);
                SM.SetStateByName("menu");
            }
        </script>
        <script type="text/x-jQuery-tmpl" id="questionTmpl">
        <div class='question' id='question-{{ID}}'>
	        <article>
		    <div class='question-pic'>
		        <img src='{{imageUrl}}' alt='question' />
		        <div class='question-type'>{{category}} </div>
		    </div>
		    <ul class='question-answer clearfix'>
                {{#answerArray}}
                    <li data-key='' class='answer-key'></li>
                {{/answerArray}}
		    </ul>
		    <hr />
	        </article>
	        <aside>
		    <ul class='question-keyboard clearfix'>
                {{#keyboardArray}}
                    <li data-key='{{value}}' data-index='{{index}}' class='question-key'>{{value}}</li>
                {{/keyboardArray}}
		    </ul>
	        </aside>
	        <div class="clearfix" id="play-next">
            <input id='answer-{{ID}}' type='text'/>
            <input class='btnNextQuestion' type='button' value='下一题'></input>
            </div>
	    </div>
        </script>
    </body>
</html>
