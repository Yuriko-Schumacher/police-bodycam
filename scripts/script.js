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

// -------------------- SKIP BUTTON ---------------------
const $link = d3
	.select("#link")
	.append("div")
	.html('<a href="#step-14"> >>></a> SKIP TO EXPLORE ALL VIDEOS');

// -------------------- STEPS ---------------------
const steps = [
	"step-1",
	"step-2",
	"step-3",
	"step-4",
	"step-5",
	"step-6-1",
	"step-6-2",
	"step-7",
	"step-8-1",
	"step-8-2",
	"step-9",
	"step-10",
	"step-11",
	"step-12",
	"step-13",
	"step-14",
	"step-15",
];

let prevStep = null;
let currentStep = "step-1";
let nextStep = "step-2";

const dotsG = d3.select(".time-container");
const videoG = d3.select("#video").append("g").classed("video-container", true);

// ---------------- STEP FUNCTION -----------------
// ---------------- FIRST STEP -----------------
function firstStep() {
	$link.style("visibility", "hidden");
	d3.select("#video").classed("video-explore", false);
	videoG.selectAll("video").remove();
	dotsG
		.selectAll("circle")
		.classed("active-circles", false)
		.attr("r", 5)
		.attr("fill-opacity", 0.3);
}

// ---------------- MIDDLE STEPS -----------------

function stepFn() {
	$link.style("visibility", "visible");
	dotsG
		.selectAll("circle")
		.classed("active-circles", false)
		.attr("r", 5)
		.attr("fill-opacity", 0.3)
		.attr("pointer-events", "none");
	d3.select("#step-14")
		.select("div")
		.classed("tooltip", false)
		.html(
			"<p>Click time stamps above to watch more video footage from the night.</p>"
		);
	// LIGHT AND DIM CIRCLES ON TIMELINE
	currentStep = document.getElementsByClassName("active")[0].id;
	let currentIndex = steps.findIndex((step) => step === currentStep);
	let prevIndex = currentIndex === 0 ? null : currentIndex - 1;
	prevStep = steps[prevIndex];
	let nextIndex = currentIndex === 12 ? null : currentIndex + 1;
	nextStep = steps[nextIndex];
	let currentDots = dotsG.selectAll(`circle.${currentStep}-circles`);
	let prevDots = dotsG.selectAll(`circle.${prevStep}-circles`);
	let nextDots = dotsG.selectAll(`circle.${nextStep}-circles`);
	currentDots
		.classed("active-circles", true)
		.attr("r", 6)
		.attr("fill-opacity", 1);
	prevDots
		.classed("active-circles", false)
		.attr("r", 5)
		.attr("fill-opacity", 0.3);
	nextDots
		.classed("active-circles", false)
		.attr("r", 5)
		.attr("fill-opacity", 0.3);

	// ---------------- ADD AND REMOVE VIDEOS -----------------
	d3.select("#video").classed("video-explore", false);
	videoG.selectAll("video").remove();
	videoG.style("opacity", 0);
	let videosToAdd = bodycamData.filter(
		(d) => d.category === "Bodycam footage" && d.step === currentStep
	);
	videosToAdd = videosToAdd.sort((a, b) => a.place - b.place);
	videosToAdd.forEach((video) => {
		videoG.transition().duration(2000).delay(2000).style("opacity", 1);
		let videoEl = videoG
			.append("video")
			.attr("controls", true)
			.attr("muted", true)
			.attr(
				"width",
				videosToAdd.length > 1 ? 0.33 * windowW : 0.45 * windowW
			);
		videoEl
			.append("source")
			.attr("src", video.src)
			.attr("type", "video/mp4");
	});
}

// ------------------- FOR LAST STEP --------------------

function exploreMore() {
	d3.select("#step-15").select(".dark").style("padding", 0);
	$link.style("visibility", "hidden");
	d3.select("#chart").style("z-index", 99);
	dotsG
		.selectAll("circle")
		.classed("active-circles", false)
		.attr("r", 5)
		.attr("fill-opacity", 0.3)
		.attr("pointer-events", "auto");
	let dots = dotsG.selectAll("circle");
	dots.style("cursor", "pointer");
	let step14 = d3.select("#step-14").select("div");
	let isClicked = false;
	let prevDot;

	d3.select("#video").classed("video-explore", true);

	dots.on("mouseover", function (e, d) {
		isClicked = false;
		videoG.selectAll("video").remove();
		if (prevDot !== undefined) {
			prevDot
				.attr("r", 5)
				.attr("fill-opacity", 0.3)
				.classed("dot-active", false);
			if (prevDot.category === "BPD Tweets/News") {
				return;
			} else {
				let prevDotId = prevDot.attr("id");
				map.setPaintProperty(prevDotId, "circle-opacity", 0);
			}
		}
		let dot = d3.select(this);
		dot.attr("r", 7).attr("fill-opacity", 1).classed("dot-active", true);
		step14
			.classed("tooltip", true)
			.html(
				`Time: <b>${d3.timeFormat("%I:%M %p")(
					d.parsedTime
				)}</b><br>Location: <b>${d.location}</b><br><p>${
					d.comment
				}.</p>`
			);
		if (d.category === "BPD Tweets/News") {
			return;
		} else {
			let id = dot.attr("id");
			map.setPaintProperty(id, "circle-opacity", 1);
		}
	})
		.on("mouseout", function (e, d) {
			if (!isClicked) {
				d3.select(this)
					.attr("r", 5)
					.attr("fill-opacity", 0.3)
					.classed("dot-active", false);
				step14.html(
					"<p>Click time stamps above to watch more video footage from the night.</p>"
				);
				if (d.category === "BPD Tweets/News") {
					return;
				} else {
					let id = d3.select(this).attr("id");
					map.setPaintProperty(id, "circle-opacity", 0);
				}
			}
		})
		.on("click", function (e, d) {
			isClicked = !isClicked;
			let dot = d3.select(this);
			dot.attr("r", 7)
				.attr("fill-opacity", 1)
				.classed("dot-active", true);
			step14
				.classed("tooltip", true)
				.html(
					`Time: <b>${d3.timeFormat("%I:%M %p")(
						d.parsedTime
					)}</b><br>Location: <b>${d.location}</b><br><p>${
						d.comment
					}.</p>`
				);
			if (d.category === "BPD Tweets/News") {
				return;
			} else {
				let id = dot.attr("id");
				map.setPaintProperty(id, "circle-opacity", 1);
			}
			prevDot = dotsG.select(".dot-active");
			// ---------------- ADD AND REMOVE VIDEOS -----------------

			videoG.selectAll("video").remove();
			videoG.style("opacity", 0);

			if (d.category === "Bodycam footage") {
				videoG.transition().duration(2000).style("opacity", 1);
				let videoEl = videoG
					.append("video")
					.attr("controls", true)
					.attr("muted", true)
					.attr("width", windowW < 1500 ? 600 : 800);
				videoEl
					.append("source")
					.attr("src", d.src)
					.attr("type", "video/mp4");
			}
		});
}

function dummyStep() {
	d3.select("#chart").style("z-index", 0);
	dotsG
		.selectAll("circle")
		.classed("active-circles", false)
		.attr("r", 5)
		.attr("fill-opacity", 0.3);
	videoG.selectAll("video").remove();
}
