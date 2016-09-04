$(function() {

	$('body').click(function() {
		console.log("olol");
		$.ajax({
			url: "daminion.json",
			type: "GET",
			// dataType: 'json',
			cache: false,
			success: function(data) {
				if(data.success) {
					console.log("ura");
				} else {
					console.log("vot blya");
				}
				console.log("sdkfjslfjglj");
				$(".test").html("sadgfklksdhj");
			},
			error: function(jqXHR, toto) {
				console.log(jqXHR);
				console.log(toto);
			}
		});
	});



	var	checked = $("input[name=license-plan]:checked"),
	perLicense = +checked.next().find(".license-price").text(),
	selectedPlan = checked.val(),
	number = +$("#license-number option:selected").val(),
	selectedContainer = $(".selected-plan");

	totalCalc(perLicense, number);
	selectedContainer.html(selectedPlan);

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
	
});


function totalCalc(perLicense, number) {
	var total = perLicense * number;
	$(".total-price").html(total);
}