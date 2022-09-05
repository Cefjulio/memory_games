// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     	this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/codepen-logo.png"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "php",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/php-logo_1.png",
			img: "./img/1A.png",
			id: 1,
		},
		{
			name: "css3",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/css3-logo.png",
			img: "./img/2A.png",
			id: 2
		},
		{
			name: "html5",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/html5-logo.png",
			img: "./img/3A.png",
			id: 3
		},
		{
			name: "jquery",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/jquery-logo.png",
			img: "./img/4A.png",
			id: 4
		}, 
		{
			name: "javascript",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/js-logo.png",
			img: "./img/5A.png",
			id: 5
		},
		{
			name: "node",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/nodejs-logo.png",
			img: "./img/6A.png",
			id: 6
		},
		{
			name: "photoshop",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/photoshop-logo.png",
			img: "./img/7A.png",
			id: 7
		},
		{
			name: "python",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/python-logo.png",
			img: "./img/8A.png",
			id: 8
		},
		{
			name: "rails",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/rails-logo.png",
			img: "./img/9A.png",
			id: 9
		},
		{
			name: "sass",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sass-logo.png",
			img: "./img/10A.png",
			id: 10
		},
		{
			name: "sublime",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sublime-logo.png",
			img: "./img/11A.png",
			id: 11
		},
		{
			name: "wordpress",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
			img: "./img/12A.png",
			id: 12
		},
		{
			name: "13",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
			img: "./img/13A.png",
			id: 13
		},
		{
			name: "14",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
			img: "./img/14A.png",
			id: 14
		},
		{
			name: "15",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
			img: "./img/15A.png",
			id: 15
		},
		{
			name: "16",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
			img: "./img/16A.png",
			id: 16
		},
		{
			name: "17",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
			img: "./img/17A.png",
			id: 17
		},
		{
			name: "18",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
			img: "./img/18A.png",
			id: 18
		},
		{
			name: "19",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
			img: "./img/19A.png",
			id: 19
		},
		{
			name: "20",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
			img: "./img/20A.png",
			id: 20
		},
		{
			name: "21",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
			img: "./img/21A.png",
			id: 21
		},
		{
			name: "22",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
			img: "./img/22A.png",
			id: 22
		},
		{
			name: "23",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
			img: "./img/23A.png",
			id: 23
		},
		{
			name: "24",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
			img: "./img/24A.png",
			id: 24
		},
		{
			name: "25",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
			img: "./img/25A.png",
			id: 25
		},
		{
			name: "26",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
			img: "./img/26A.png",
			id: 26
		},
		{
			name: "27",
			//img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
			img: "./img/27A.png",
			id: 27
		},


	];
    
	Memory.init(cards);


})();