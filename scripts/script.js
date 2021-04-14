// -------------------- TIMELINE CHART ---------------------
const $chart = d3.select("#chart");
const size = { w: windowW, h: 100 };
const margin = { t: 40, r: windowW * 0.1, b: 30, l: windowW * 0.1 };
const timeSvg = $chart
	.append("svg")
	.attr("width", size.w)
	.attr("height", size.h);

const containerG = timeSvg.append("g").classed("time-container", true);
const categories = ["Peaceful Protest", "BPD Tweets/News", "Bodycam footage"];
const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%SZ");

let bodycamData;

d3.csv("data/bodycam-merged.csv", function (d) {
	d.parsedTime = parseTime(d.timeToPerse);
	d.vidId = d.src.slice(19, 21);
	return d;
}).then(function (data) {
	console.log(data);
	bodycamData = data;
	let timeline = new Timeline();
	timeline.selection(containerG).size(size).margins(margin).data(data);
	// console.log(data);
	timeline.draw();
});
