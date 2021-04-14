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
];

let prevStep = null;
let currentStep = "step-1";
let nextStep = "step-2";

const dotsG = d3.select(".time-container");
const videoG = d3.select("#video").append("g").classed("video-container", true);

function stepFn() {
	dotsG
		.selectAll("circle")
		.classed("active-circles", false)
		.attr("r", 5)
		.attr("fill-opacity", 0.3);
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
				windowW < 1500 && videosToAdd.length > 1
					? 450
					: videosToAdd.length > 1
					? 600
					: 800
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
	videoG.selectAll("video").remove();
}

// -------------------- MAPBOX SCROLLYTELLING --------------------
const config = {
	style: "mapbox://styles/yuriko-schumacher/ckn6s8kd50meg17qqzdnctxix",
	accessToken:
		"pk.eyJ1IjoieXVyaWtvLXNjaHVtYWNoZXIiLCJhIjoiY2ttNDVoemgyMDFjcDJxdXM5cWx5d3FzdiJ9.Ajc4ZM1IbKLbRPSkrBJNrA",
	theme: "dark",
	chapters: [
		{
			id: "step-1",
			alignment: "right",
			title: "The night of May 31",
			description:
				"<span class='highlighter pink-highlighter'>Peaceful protests</span> ended a little before 9 p.m.<br><br>Throughout the night, Boston Police Department posted <span class='highlighter blue-highlighter'>a series of tweets,</span> asking for people to go home.<br><br>The chart above shows the timeline of these and the <span class='highlighter yellow-highlighter'>BPD’s body camera footage</span>.",
			location: {
				center: [-71.03734, 42.35052],
				zoom: 12,
				pitch: 0,
				bearing: 0,
			},
			mapAnimation: "flyTo",
			rotateAnimation: false,
			callback: "stepFn",
			onChapterEnter: [
				{
					layer: "step-2",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-3",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "protesters",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-4",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-5",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-6-1",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-6-2",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-8-1",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-8-2",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-9",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-10",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-11",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-12",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "T1",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "T2",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "T3",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "T4",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "T5",
					opacity: 0,
					duration: 1,
				},
			],
			onChapterExit: [],
		},
		{
			id: "step-2",
			alignment: "right",
			title: "",
			description:
				"Organizers of one march, <a href='https://www.blackboston.org/' target='_blank'>Black Boston</a>, estimate that more than 20,000 people marched from Nubian Square to the State House.<br><br>At 6:30 p.m., <span class='highlighter pink-highlighter'>the crowds started heading north.</span><br><br>About the same time, <span class='highlighter blue-highlighter'><a href='https://twitter.com/bostonpolice/status/1267222510145323008' target='_blank'>BPD tweets asked them</a></span> for a safe and peaceful demonstration.",
			location: {
				center: [-71.03734, 42.35052],
				zoom: 12,
				pitch: 0,
				bearing: 0,
			},
			mapAnimation: "flyTo",
			rotateAnimation: false,
			callback: "stepFn",
			onChapterEnter: [
				{
					layer: "step-2",
					opacity: 1,
					duration: 1,
				},
				{ layer: "protesters", opacity: 0, duration: 1000 },
				{ layer: "step-3", opacity: 0, duration: 1000 },
			],
			onChapterExit: [],
		},
		{
			id: "step-3",
			alignment: "right",
			title: "",
			description:
				"The crowds went north on Washington Street through downtown and Boston Common, reaching <span class='highlighter pink-highlighter'>the State House at 8:27 p.m.</span><br><br>They stayed there about 25 minutes. The demonstration ended before 9 p.m.",
			location: {
				center: [-71.03734, 42.35052],
				zoom: 12,
				pitch: 0,
				bearing: 0,
			},
			mapAnimation: "flyTo",
			rotateAnimation: false,
			callback: "stepFn",
			onChapterEnter: [
				{
					layer: "protesters",
					opacity: 1,
					duration: 3000,
				},
				{
					layer: "step-3",
					opacity: 1,
					duration: 5000,
				},
				{
					layer: "step-4",
					opacity: 0,
					duration: 1,
				},
			],
			onChapterExit: [],
		},
		{
			id: "step-4",
			alignment: "right",
			title: "",
			description:
				"At 9:11 pm, an officer in  front of the Downtown Crossing station is seen <span class='highlighter yellow-highlighter'>spraying an elderly male protester.</span>",
			location: {
				center: [-71.06044, 42.35573],
				zoom: 18.11,
				pitch: 70,
				bearing: 0,
			},
			mapAnimation: "flyTo",
			rotateAnimation: false,
			callback: "stepFn",
			onChapterEnter: [
				{
					layer: "protesters",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-2",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-3",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-4",
					opacity: 1,
					duration: 1,
				},
				{
					layer: "step-5",
					opacity: 0,
					duration: 1,
				},
			],
			onChapterExit: [],
		},
		{
			id: "step-5",
			alignment: "right",
			title: "",
			description:
				'At 9:16 p.m., in front of the Park Street station exit, <span class="highlighter yellow-highlighter">many officers are seen pushing people to the corner.</span><br><br>Across the street, at 9:21 p.m., an officer says, <span class="highlighter yellow-highlighter">"Start spraying the fuckers."</span>',
			location: {
				center: [-71.06213, 42.35633],
				zoom: 18.11,
				pitch: 70,
				bearing: -140.71,
			},
			mapAnimation: "flyTo",
			rotateAnimation: false,
			callback: "stepFn",
			onChapterEnter: [
				{
					layer: "step-4",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-5",
					opacity: 1,
					duration: 1,
				},
				{
					layer: "step-6-1",
					opacity: 0,
					duration: 1,
				},
			],
			onChapterExit: [],
		},
		{
			id: "step-6-1",
			alignment: "right",
			title: "",
			description:
				'At 9:23 p.m., a large group of officers is seen approaching the protesters on Tremont Street, with one officer <span class="highlighter yellow-highlighter">widely spraying the protesters.</span><br><br>At 9:26 p.m., multiple bike patrol officers <span class="highlighter yellow-highlighter">aggressively towards a protester</span> who was throwing things at police.',
			location: {
				center: [-71.0633, 42.3552],
				zoom: 18.11,
				pitch: 70,
				bearing: -140.71,
			},
			mapAnimation: "flyTo",
			rotateAnimation: false,
			callback: "stepFn",
			onChapterEnter: [
				{
					layer: "step-5",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-6-1",
					opacity: 1,
					duration: 1,
				},
				{
					layer: "step-6-2",
					opacity: 0,
					duration: 1,
				},
			],
			onChapterExit: [],
		},
		{
			id: "step-6-2",
			alignment: "right",
			title: "",
			description:
				'On the other side of West Street, at 9:29 p.m., an officer is seen <span class="highlighter yellow-highlighter">pulling the clothing of a male protester</span>, with a woman screaming "Stop!"',
			location: {
				center: [-71.06179, 42.35414],
				zoom: 18.11,
				pitch: 70,
				bearing: -140.71,
			},
			mapAnimation: "flyTo",
			rotateAnimation: false,
			callback: "stepFn",
			onChapterEnter: [
				{
					layer: "step-6-1",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-6-2",
					opacity: 1,
					duration: 1,
				},
				{
					layer: "T1",
					opacity: 0,
					duration: 1,
				},
			],
			onChapterExit: [],
		},
		{
			id: "step-7",
			alignment: "right",
			title: "",
			description:
				'By this time, trains are already bypassing Park Street and Downtown Crossing stations.<br><br><span style="font-size:0.8em;"> ❌ </span> signs on the map indicates T stations being bypassed at the time.<br><br>With the area turning into a battlefield, police post two tweets, <span class="highlighter blue-highlighter"><a href="https://twitter.com/bostonpolice/status/1267269715275198464" target="_blank">urging people to vacate the area.</a></span>',
			location: {
				center: [-71.05203, 42.3536],
				zoom: 13.72,
				pitch: 0,
				bearing: 0,
			},
			mapAnimation: "flyTo",
			rotateAnimation: false,
			callback: "stepFn",
			onChapterEnter: [
				{
					layer: "step-6-2",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "T1",
					opacity: 1,
					duration: 1,
				},
				{
					layer: "T2",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-8-1",
					opacity: 0,
					duration: 1,
				},
			],
			onChapterExit: [],
		},
		{
			id: "step-8-1",
			alignment: "right",
			title: "",
			description:
				'At 9:44 p.m. at the intersection of Washington Street and Ave de Lafayette, <span class="highlighter yellow-highlighter">multiple officers are seen spraying the protesters.</span>',
			location: {
				center: [-71.06229, 42.35405],
				zoom: 18.11,
				pitch: 70,
				bearing: 24,
			},
			mapAnimation: "flyTo",
			rotateAnimation: false,
			callback: "stepFn",
			onChapterEnter: [
				{
					layer: "step-8-1",
					opacity: 1,
					duration: 1,
				},
				{
					layer: "T2",
					opacity: 1,
					duration: 5000,
				},
				{
					layer: "step-8-2",
					opacity: 0,
					duration: 1,
				},
			],
			onChapterExit: [],
		},
		{
			id: "step-8-2",
			alignment: "right",
			title: "",
			description:
				'At 9:48 p.m. just north of Downtown Crossing station, an officer is seen <span class="highlighter yellow-highlighter">spraying a protester from a very close distance,</span> while another officer is seen <span class="highlighter yellow-highlighter">punching a male protester in the stomach.</span>',
			location: {
				center: [-71.05975, 42.35607],
				zoom: 18.11,
				pitch: 70,
				bearing: 36,
			},
			mapAnimation: "flyTo",
			rotateAnimation: false,
			callback: "stepFn",
			onChapterEnter: [
				{
					layer: "step-8-1",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "T2",
					opacity: 1,
					duration: 1,
				},
				{
					layer: "step-8-2",
					opacity: 1,
					duration: 1,
				},
				{
					layer: "step-9",
					opacity: 0,
					duration: 1,
				},
			],
			onChapterExit: [],
		},
		{
			id: "step-9",
			alignment: "right",
			title: "",
			description:
				'At 9:52 p.m. on Washington Street., an officer with a pepper spray on his hand says, <span class="highlighter yellow-highlighter">"I wanna hit this asshole."</span><br><br>At 9:56 p.m., protesters are seen <span class="highlighter yellow-highlighter">running away from the officers.</span><br><br>Around 10 p.m., BPD tweets that protestors "have <span class="highlighter blue-highlighter"><a href="https://twitter.com/bostonpolice/status/1267274567388626947" target="_blank">surrendered the moral high ground."</a></span>',
			location: {
				center: [-71.05885, 42.35672],
				zoom: 18.11,
				pitch: 70,
				bearing: 36,
			},
			mapAnimation: "flyTo",
			rotateAnimation: false,
			callback: "stepFn",
			onChapterEnter: [
				{
					layer: "step-8-2",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-9",
					opacity: 1,
					duration: 1,
				},
				{
					layer: "T3",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-10",
					opacity: 0,
					duration: 1,
				},
			],
			onChapterExit: [],
		},
		{
			id: "step-10",
			alignment: "right",
			title: "",
			description:
				'Some more intense moments are captured on the camera. At 10:08 p.m., an officer approached the crowd and <span class="highlighter yellow-highlighter">pushed a protester down with a nightstick.</span><br><br>Another video taken at 10:11 p.m. shows an officer <span class="highlighter yellow-highlighter">chasing protesters with something in his right hand.</span>',
			location: {
				center: [-71.06143, 42.35715],
				zoom: 18.11,
				pitch: 70,
				bearing: 36,
			},
			mapAnimation: "flyTo",
			rotateAnimation: false,
			callback: "stepFn",
			onChapterEnter: [
				{
					layer: "step-9",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-10",
					opacity: 1,
					duration: 1,
				},
				{
					layer: "T3",
					opacity: 1,
					duration: 1,
				},
				{
					layer: "T4",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-11",
					opacity: 0,
					duration: 1,
				},
			],
			onChapterExit: [],
		},
		{
			id: "step-11",
			alignment: "right",
			title: "",
			description:
				'At 10:20 p.m., around Downtown Crossing station, an officer talks about <span class="highlighter yellow-highlighter">using a police vehicle to attack demonstrators.</span><br><br>BPD again posted two consecutive tweets, stressing the <span class="highlighter blue-highlighter"><a href="" target="_blank">"officers are fighting to protect"</a></span> the city.',
			location: {
				center: [-71.06044, 42.35588],
				zoom: 18.11,
				pitch: 70,
				bearing: 36,
			},
			mapAnimation: "flyTo",
			rotateAnimation: false,
			callback: "stepFn",
			onChapterEnter: [
				{
					layer: "step-10",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-11",
					opacity: 1,
					duration: 1,
				},
				{
					layer: "T4",
					opacity: 1,
					duration: 1,
				},
				{
					layer: "step-12",
					opacity: 0,
					duration: 1,
				},
			],
			onChapterExit: [],
		},
		{
			id: "step-12",
			alignment: "right",
			title: "",
			description:
				'At 10:43 p.m., footage captured north of Boston Common showed a protester taunting officers, while <span class="highlighter yellow-highlighter">tear gas billows behind him.</span><br><br>One minute later, <span class="highlighter yellow-highlighter">an officer pushes a female protester down with a nightstick.</span>',
			location: {
				center: [-71.06195, 42.35637],
				zoom: 18.11,
				pitch: 70,
				bearing: 0,
			},
			mapAnimation: "flyTo",
			rotateAnimation: false,
			callback: "stepFn",
			onChapterEnter: [
				{
					layer: "step-11",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-12",
					opacity: 1,
					duration: 1,
				},
				{
					layer: "T5",
					opacity: 0,
					duration: 1,
				},
			],
			onChapterExit: [],
		},
		{
			id: "step-13",
			alignment: "right",
			title: "",
			description:
				'<a href="https://bpdnews.com/news/2020/6/1/bpd-confirms-fifty-three-arrests-made-and-one-summons-issued-following-protests-in-boston" target="_blank">BPD announced</a> <span class="highlighter blue-highlighter">53 people were arrested</span> during the protest.<br><br><a href="https://twitter.com/MBTA/status/1267265253022277635" target="_blank">MBTA said</a> by the end of the night, trains were bypassing twelve T stations around the area.',
			location: {
				center: [-71.05203, 42.3536],
				zoom: 13.72,
				pitch: 0,
				bearing: 0,
			},
			mapAnimation: "flyTo",
			rotateAnimation: false,
			callback: "stepFn",
			onChapterEnter: [
				{
					layer: "step-12",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "T1",
					opacity: 0.5,
					duration: 1,
				},
				{
					layer: "T2",
					opacity: 0.5,
					duration: 1,
				},
				{
					layer: "T3",
					opacity: 0.5,
					duration: 1,
				},
				{
					layer: "T4",
					opacity: 0.5,
					duration: 1,
				},
				{
					layer: "T5",
					opacity: 0.5,
					duration: 1,
				},
				{
					layer: "0",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "2",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "3",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "4",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "6",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "7",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "8",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "9",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "10",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "13",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "15",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "16",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "17",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "19",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "20",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "21",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "24",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "25",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "26",
					opacity: 0,
					duration: 1,
				},
			],
			onChapterExit: [],
		},
		{
			id: "step-14",
			alignment: "right",
			title: "",
			description:
				"Click time stamps above to watch more video footage from the night.",
			location: {
				center: [-71.05203, 42.3536],
				zoom: 13.72,
				pitch: 0,
				bearing: 0,
			},
			mapAnimation: "flyTo",
			rotateAnimation: false,
			callback: "exploreMore",
			onChapterEnter: [
				{
					layer: "T1",
					opacity: 0.3,
					duration: 1,
				},
				{
					layer: "T2",
					opacity: 0.3,
					duration: 1,
				},
				{
					layer: "T3",
					opacity: 0.3,
					duration: 1,
				},
				{
					layer: "T4",
					opacity: 0.3,
					duration: 1,
				},
				{
					layer: "T5",
					opacity: 0.3,
					duration: 1,
				},
			],
			onChapterExit: [],
		},
		{
			id: "step-15",
			alignment: "full",
			location: {
				center: [-71.05203, 42.3536],
				zoom: 13.72,
				pitch: 0,
				bearing: 0,
			},
			mapAnimation: "flyTo",
			rotateAnimation: false,
			callback: "dummyStep",
			onChapterEnter: [],
			onChapterExit: [],
		},
	],
};
