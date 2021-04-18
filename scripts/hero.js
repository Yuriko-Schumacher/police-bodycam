const windowH = document.querySelector("#hero").clientHeight;
const windowW = document.querySelector("#hero").clientWidth;

// ---------- HERO PICTURES ----------
const hero = d3.select("#hero");
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

if (windowW > 750) {
	const heroImagesG = hero.append("g").classed("hero__imgG", true);
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
			.delay(index * 150 + 1000)
			.style("opacity", 1);
	});
}
