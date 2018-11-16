var url = "https://api.dotball.com/api/";
var upcomingData = { data: [] };
var popularcontest = { popular: [] };
var hotcontest = { hot: [] };
var liveScore = { live: [] };
var countDownDate = {};
var countDownDatesec={}
var countlength = "";
var hotlength =""
function upcomingMatches() {
	var template = $("#upcomingMatches").html();
	Mustache.parse(template); // optional, speeds up future uses
	var rendered = Mustache.render(template, upcomingData);
	$owl.trigger("destroy.owl.carousel");
	$owl
		.find(".owl-stage-outer")
		.children()
		.unwrap();
	$owl.removeClass("owl-center owl-loaded owl-text-select-on");
	$(".upcoming-slider").html(rendered);
	$owl.owlCarousel(upcominconfig);
}
function popularContest() {
	var template = $("#popularContest").html();
	Mustache.parse(template); // optional, speeds up future uses
	var rendered = Mustache.render(template, popularcontest);
	$popular.trigger("destroy.owl.carousel");
	$popular
		.find(".owl-stage-outer")
		.children()
		.unwrap();
	$popular.removeClass("owl-center owl-loaded owl-text-select-on");
	$(".popular__carousel").html(rendered);
	$popular.owlCarousel(upcominconfig);
}
function hotContest() {
	var template = $("#hotContest").html();
	Mustache.parse(template); // optional, speeds up future uses
	var rendered = Mustache.render(template, hotcontest);
	$(".new__table tbody").html(rendered);
}
function liveScores() {
	var template = $("#liveScore").html();
	Mustache.parse(template); // optional, speeds up future uses
	var rendered = Mustache.render(template, liveScore);
	$live.trigger("destroy.owl.carousel");
	$live
		.find(".owl-stage-outer")
		.children()
		.unwrap();
	$live.removeClass("owl-center owl-loaded owl-text-select-on");
	$(".live-slider").html(rendered);
	$('.dotball-section__live').removeClass('hide')
	$live.owlCarousel(liveconfig);
}

$.ajax({
	url: url + "match/filter?match_status=upcoming",
	success: function (response) {
		if (response.data) {
			upcomingData = { data: [] };
			countlength = response.data.length;
			response.data.map((item, number) => {
				upcomingData.data.push({
					keyvalue: number,
					team1: item.match_name.split(" vs ")[0],
					team2: item.match_name.split(" vs ")[1],
					seriesname: item.series_name
				});
				timer(number, item.date);
			});
			upcomingMatches();
		}
	}
});
$.ajax({
	url: url + "/contest/popular-contests",
	success: function (response) {
		if (response.data) {
			popularcontest = { popular: [] };
			response.data.map((item, key) => {
				popularcontest.popular.push({
					keyvalue: (key + 1) % 7,
					winamount: item.winning_amount,
					contesttype: item.contest_type,
					maxlimit: item.contest_max_limit,
					totaljoined: item.total_joined,
					entryfee: item.entry_fee == 0 ? "free" : "₹" + item.entry_fee,
					left: item.contest_max_limit - item.total_joined,
					perc: (item.total_joined / item.contest_max_limit) * 100 + "%",
					winners: item.winners,
				});
			});
			popularContest();
		}
	}
});
$.ajax({
	url: url + "contest/banner-contests",
	success: function (response) {
		if (response.data) {
			hotcontest = { hot: [] };
			hotlength= response.data.length + 1;
			response.data.map((item, key) => {
				hotcontest.hot.push({
					keyvalue: key + 1,
					team1: item.match_name.split(" vs ")[0],
					team2: item.match_name.split(" vs ")[1],
					series_name: item.series_name,
					contest_name: item.contest_name,
					matchname: item.match_name,
					winamount: item.winning_amount,
					contesttype: item.contest_type,
					maxlimit: item.contest_max_limit,
					totaljoined: item.total_joined,
					entryfee: item.entry_fee == 0 ? "free" : "₹" + item.entry_fee,
					left: item.contest_max_limit - item.total_joined,
					perc: (item.total_joined / item.contest_max_limit) * 100 + "%",
					winners: item.winners,
				});
				timersecond(key + 1,item.match_date)
			});
			hotContest()
		}
	}
});
setInterval(function(){
	getliveScore()
},15000)
function getliveScore(){
	$.ajax({
		url: url + "match/filter?match_status=ongoing",
		success: function (response) {
			if (response.data) {
				liveScoreapi(response.data)
			}
		}
	});
}
getliveScore()
function liveScoreapi(data) {
	liveScore = { live: [] };
	data.map(function (item) {
		$.ajax({
			url: url + "/scoring/live-score?match_id=" + item.match_id,
			success: function (response) {
				if (response.data) {
					liveScore.live.push({
						battingTeam: response.data.batting_team,
						firstinnings: response.data.innings == 1 ? false : true,
						currentscore: response.data.current_score_str,
						current_run_rate: response.data.current_run_rate,
						last_three_overs: response.data.last_three_overs,
						bowling_team: response.data.bowling_team,
						last_three_overs: response.data.last_three_overs,
						strikerName: response.data.striker ? response.data.striker.name : "-",
						strikerRun: response.data.striker ? response.data.striker.runs : "-",
						strikerBowl: response.data.striker ? response.data.striker.balls : "-",
						strikerfours: response.data.striker ? response.data.striker.fours : "-",
						strikersixes: response.data.striker ? response.data.striker.sixes : "-",
						strikersr: response.data.striker ? response.data.striker.strike_rate : "-",
						nostrikerName: response.data.nonstriker ? response.data.nonstriker.name: "-",
						nostrikerRun: response.data.nonstriker ? response.data.nonstriker.runs: "-",
						nostrikerBowl: response.data.nonstriker ? response.data.nonstriker.balls: "-",
						nostrikerfours: response.data.nonstriker ? response.data.nonstriker.fours: "-",
						nostrikersixes: response.data.nonstriker ? response.data.nonstriker.sixes: "-",
						nostrikersr: response.data.nonstriker ? response.data.nonstriker.strike_rate: "-",
						spellName: response.data.spell_bowler ?response.data.spell_bowler.name : "-",
						spellover: response.data.spell_bowler ? response.data.spell_bowler.overs :"-",
						spellruns: response.data.spell_bowler? response.data.spell_bowler.runs:"-",
						spellwickets: response.data.spell_bowler? response.data.spell_bowler.wickets:"-",
						spellmaiden: response.data.spell_bowler?response.data.spell_bowler.maiden_overs:"-",
						spelleconomy: response.data.spell_bowler ?response.data.spell_bowler.economy :"-",
						bowlerName: response.data.bowler ?response.data.bowler.name : "-",
						bowlerover: response.data.bowler ? response.data.bowler.overs :"-",
						bowlerruns: response.data.bowler? response.data.bowler.runs:"-",
						bowlerwickets: response.data.bowler ? response.data.bowler.wickets:"-",
						bowlermaiden: response.data.bowler ?response.data.bowler.maiden_overs:"-",
						bowlereconomy: response.data.bowler ?response.data.bowler.economy :"-",
						last_wicket:response.data.last_wicket,
						target_run_str:response.data.target_run_str


					})
				}
				liveScores()
			}
		});
	})
}
function timer(keyvalue, datevalue) {
	if (datevalue) {
		countDownDate[keyvalue] = new Date(datevalue).getTime();
	}
	if (keyvalue <= countlength) {
		var x = setInterval(function () {
			var now = new Date().getTime();
			var distance = countDownDate[keyvalue] - now;
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			if (distance < 0) {
				clearInterval(x);
				$(".card__timing." + keyvalue).html("Closed");
			} else {
				if (days > 0) {
					$(".card__timing." + keyvalue).html(
						"Ends In " + days + "d " + hours + "h " + minutes + "m "
					);
				} else {
					$(".card__timing." + keyvalue).html(
						"Ends In " + hours + "h " + minutes + "m " + seconds + "s "
					);
				}
			}
		}, 1000);
	}
}
function timersecond(keyvalue, datevalue) {
	if (datevalue) {
		countDownDatesec[keyvalue] = new Date(datevalue).getTime();
	}
	if (keyvalue <= hotlength) {
		var x = setInterval(function () {
			var now = new Date().getTime();
			var distance = countDownDatesec[keyvalue] - now;
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			if (distance < 0) {
				clearInterval(x);
				$('.new__table tbody tr:nth-child('+keyvalue+') .card__timing ').html("Closed");
			} else {
				if (days > 0) {
					$('.new__table tbody tr:nth-child('+keyvalue+') .card__timing ').html(
						"Ends In " + days + "d " + hours + "h " + minutes + "m "
					);
				} else {
					$('.new__table tbody tr:nth-child('+keyvalue+')  .card__timing ').html(
						"Ends In " + hours + "h " + minutes + "m " + seconds + "s "
					);
				}
			}
		}, 1000);
	}
}



