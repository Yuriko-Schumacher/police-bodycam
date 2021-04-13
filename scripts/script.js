const windowH = document.querySelector("#hero").clientHeight;
const windowW = document.querySelector("#hero").clientWidth;

// ---------- HERO PICTURES ----------
const $hero = d3.select("#hero");
const heroImages = [
	{
		id: "hero__img01",
		src: "assets/thumbnail_reduced/01.jpeg",
		x: 245,
		y: 848,
	},
	{
		id: "hero__img02",
		src: "assets/thumbnail_reduced/02.jpeg",
		x: 168,
		y: 541,
	},
	{
		id: "hero__img03",
		src: "assets/thumbnail_reduced/03.jpeg",
		x: 8,
		y: 695,
	},
	{
		id: "hero__img04",
		src: "assets/thumbnail_reduced/04.jpeg",
		x: 529,
		y: 802,
	},
	{
		id: "hero__img05",
		src: "assets/thumbnail_reduced/05.jpeg",
		x: 312,
		y: 26,
	},
	{
		id: "hero__img06",
		src: "assets/thumbnail_reduced/06.jpeg",
		x: 989,
		y: 702,
	},
	{
		id: "hero__img07",
		src: "assets/thumbnail_reduced/07_main.jpeg",
		x: 577,
		y: 66,
	},
	{
		id: "hero__img08",
		src: "assets/thumbnail_reduced/08.jpeg",
		x: 1189,
		y: 381,
	},
	{
		id: "hero__img09",
		src: "assets/thumbnail_reduced/09.jpeg",
		x: 844,
		y: 81,
	},
	{
		id: "hero__img10",
		src: "assets/thumbnail_reduced/10_main.jpeg",
		x: 274,
		y: 687,
	},
	{
		id: "hero__img11",
		src: "assets/thumbnail_reduced/11.jpeg",
		x: 813,
		y: 857,
	},
	{
		id: "hero__img12",
		src: "assets/thumbnail_reduced/12_main.jpeg",
		x: 126,
		y: 222,
	},
	{
		id: "hero__img13",
		src: "assets/thumbnail_reduced/13.jpeg",
		x: 1110,
		y: 26,
	},
	{
		id: "hero__img14",
		src: "assets/thumbnail_reduced/14_main.jpeg",
		x: 1084,
		y: 546,
	},
	{
		id: "hero__img15",
		src: "assets/thumbnail_reduced/15.jpeg",
		x: 1185,
		y: 715,
	},
	{
		id: "hero__img16",
		src: "assets/thumbnail_reduced/16_main.jpeg",
		x: 1097,
		y: 856,
	},
	{
		id: "hero__img17",
		src: "assets/thumbnail_reduced/17.jpeg",
		x: 43,
		y: 66,
	},
	{
		id: "hero__img18",
		src: "assets/thumbnail_reduced/18_main.jpeg",
		x: 62,
		y: 383,
	},
	{
		id: "hero__img19",
		src: "assets/thumbnail_reduced/19_main.jpeg",
		x: 1077,
		y: 215,
	},
];

const heroImagesG = $hero.append("g").classed("hero__imgG", true);
heroImages.forEach((img, index) => {
	heroImagesG
		.append("img")
		.classed("hero__img", true)
		.attr("id", `${img.id}`)
		.attr("src", `${img.src}`)
		.attr("width", `${0.12 * windowW}px`)
		.attr("alt", "bodycam thumbnail")
		.style("opacity", 0)
		.style("left", `${(img.x / 1440) * windowW}px`)
		.style("top", `${(img.y / 1024) * windowH}px`)
		.transition()
		.duration(500)
		.delay(index * 150)
		.style("opacity", 1);
});

// -------------------- TIMELINE CHART ---------------------

const $chart = d3.select("#chart");
const size = { w: windowW, h: 100 };
const margin = { t: 40, r: windowW * 0.1, b: 30, l: windowW * 0.1 };
const timeSvg = $chart
	.append("svg")
	.attr("width", size.w)
	.attr("height", size.h);

const containerG = timeSvg.append("g").classed("time-container", true);

console.log(size.h - margin.b);

const categories = ["protester", "BPD_tweets", "bodycam"];
const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%SZ");

d3.csv("data/bodycam-merged.csv", function (d) {
	d.parsedTime = parseTime(d.timeToPerse);
	return d;
}).then(function (data) {
	console.log(data);
	const filteredData = data.filter((d) => d.category !== "mbta");

	// CREATE SCALE
	const xScale = d3
		.scaleTime()
		.domain(d3.extent(filteredData, (d) => d.parsedTime))
		.range([margin.l, size.w - margin.r]);

	const yScale = d3
		.scaleBand()
		.domain(categories)
		.range([size.h - margin.b, margin.t]);

	const colorScale = d3
		.scaleOrdinal()
		.domain(categories)
		.range(["#ff29c9", "#7df9ff", "#ffff00"]);

	// DRAW X AXIS
	const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%I %p"));
	containerG
		.append("g")
		.classed("x-axis", true)
		.call(xAxis)
		.attr("transform", `translate(0, ${size.h - margin.b})`);

	// DRAW HORIZONTAL LINES
	categories.forEach((d) => {
		containerG
			.append("g")
			.classed("horizontal-lines", true)
			.append("line")
			.attr("x1", margin.l)
			.attr("y1", yScale(d))
			.attr("x2", size.w - margin.r)
			.attr("y2", yScale(d))
			.attr("stroke", "white")
			.attr("stroke-width", 1);
	});

	// PLACE DOTS
	containerG
		.selectAll("circle")
		.data(filteredData)
		.join("circle")
		.classed("timeCircles", true)
		.attr("cx", (d) => xScale(d.parsedTime))
		.attr("cy", (d) => yScale(d.category))
		.attr("r", 5)
		.attr("fill", (d) => colorScale(d.category))
		.attr("fill-opacity", 0.3);
});
