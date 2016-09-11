$(function() {

	$.ajax({
		url: "daminion.json",
		type: "GET",
		dataType: 'json',
		cache: false,
		success: function(data) {
			if(data.number) {
				var select = $("#license-number");
				for(var i = 1; i <= data.number; i++) {
					if(i === 1) {
						select.append("<option value='" + i + "' selected>" + i + "</option>");
					} else {
						select.append("<option value='" + i + "'>" + i + "</option>");
					}
				}

			}
			if(data.licenses) {
				var radioElem = $(".radio-section");
				var radioElemHTML = radioElem.html();
				// radioElem.empty();
				for(var i = 1; i < data.licenses.length; i++) {
					radioElem.append(radioElemHTML);
				}
				$("input[name=license-plan]").each(function (i) {
					this.id += i + 1;
					this.value = data.licenses[i].plan;
				});
				$(".license-plan").each(function (i) {
					$(this).attr("for", "lp" + (i + 1));
				});
				$(".license-name").each(function (i) {
					$(this).append(data.licenses[i].plan);
				});
				$(".license-price").each(function (i) {
					$(this).append(data.licenses[i].price);
				});
			}

			mainCalc();

		},
		error: function(jqXHR, err) {
			console.log(jqXHR);
			console.log(err);
		}
	});

	movingBall();

});

function mainCalc() {
	var	checked = $("input[name=license-plan]:checked"),
		perLicense = +checked.next().find(".license-price").text(),
		selectedPlan = checked.val(),
		number = +$("#license-number option:selected").val(),
		selectedContainer = $(".selected-plan");

	$("input[name=license-plan]").change(function() {
		perLicense = +$(this).next().find(".license-price").text();
		totalCalc(perLicense, number);

		selectedPlan = $(this).val();
		selectedContainer.html(selectedPlan);
	});

	$("#license-number").change(function() {
		number = +$("#license-number option:selected").val();
		totalCalc(perLicense, number);
	});
}

function totalCalc(perLicense, number) {
	var total = perLicense * number;
	$(".total-price").html(total);
}



function movingBall() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var ball = {
		x: 240,
		y: 240,
		radius: 40,
		color: "#0294bf",
		draw: function() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
			ctx.closePath();
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	}

	ball.draw();

	canvas.addEventListener('mousemove', function(e) {
		
		ball.x = e.clientX - canvas.getBoundingClientRect().left;
		ball.y = e.clientY - canvas.getBoundingClientRect().top;

		if (Math.pow((ball.x - canvas.width/2), 2) + Math.pow((ball.y - canvas.height/2), 2) < Math.pow(canvas.width/2 - ball.radius, 2)) {
			ball.draw();
		}
	});
}