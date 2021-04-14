var layerTypes = {
	fill: ["fill-opacity"],
	line: ["line-opacity"],
	circle: ["circle-opacity", "circle-stroke-opacity"],
	symbol: ["icon-opacity", "text-opacity"],
	raster: ["raster-opacity"],
	"fill-extrusion": ["fill-extrusion-opacity"],
	heatmap: ["heatmap-opacity"],
};

var alignments = {
	left: "lefty",
	center: "centered",
	right: "righty",
	full: "fully",
};

function getLayerPaintType(layer) {
	var layerType = map.getLayer(layer).type;
	return layerTypes[layerType];
}

function setLayerOpacity(layer) {
	var paintProps = getLayerPaintType(layer.layer);
	paintProps.forEach(function (prop) {
		var options = {};
		if (layer.duration) {
			var transitionProp = prop + "-transition";
			options = { duration: layer.duration };
			map.setPaintProperty(layer.layer, transitionProp, options);
		}
		map.setPaintProperty(layer.layer, prop, layer.opacity, options);
	});
}

var story = document.getElementById("story");
var features = document.createElement("div");
features.setAttribute("id", "features");

config.chapters.forEach((record, idx) => {
	var container = document.createElement("div");
	var chapter = document.createElement("div");

	if (record.title) {
		var title = document.createElement("h3");
		title.innerText = record.title;
		chapter.appendChild(title);
	}

	if (record.description) {
		var story = document.createElement("p");
		story.innerHTML = record.description;
		chapter.appendChild(story);
	}

	container.setAttribute("id", record.id);
	container.classList.add("step");
	if (idx === 0) {
		container.classList.add("active");
	}

	chapter.classList.add(config.theme);
	container.appendChild(chapter);
	container.classList.add(alignments[record.alignment] || "centered");
	features.appendChild(container);
});

story.appendChild(features);

mapboxgl.accessToken = config.accessToken;

const transformRequest = (url) => {
	const hasQuery = url.indexOf("?") !== -1;
	const suffix = hasQuery
		? "&pluginName=scrollytellingV2"
		: "?pluginName=scrollytellingV2";
	return {
		url: url + suffix,
	};
};

var map = new mapboxgl.Map({
	container: "map",
	style: config.style,
	center: config.chapters[0].location.center,
	zoom: config.chapters[0].location.zoom,
	bearing: config.chapters[0].location.bearing,
	pitch: config.chapters[0].location.pitch,
	interactive: false,
	transformRequest: transformRequest,
});

// instantiate the scrollama
var scroller = scrollama();

map.on("load", function () {
	// setup the instance, pass callback functions
	scroller
		.setup({
			step: ".step",
			offset: 0.55,
			progress: true,
		})
		.onStepEnter((response) => {
			var chapter = config.chapters.find(
				(chap) => chap.id === response.element.id
			);
			response.element.classList.add("active");
			map[chapter.mapAnimation || "flyTo"](chapter.location);
			if (chapter.onChapterEnter.length > 0) {
				chapter.onChapterEnter.forEach(setLayerOpacity);
			}
			if (chapter.callback) {
				window[chapter.callback]();
			}
		})
		.onStepExit((response) => {
			var chapter = config.chapters.find(
				(chap) => chap.id === response.element.id
			);
			response.element.classList.remove("active");
			if (chapter.onChapterExit.length > 0) {
				chapter.onChapterExit.forEach(setLayerOpacity);
			}
		});
});

// setup resize event
window.addEventListener("resize", scroller.resize);
