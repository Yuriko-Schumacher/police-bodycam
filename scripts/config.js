const config = {
	style: "mapbox://styles/yuriko-schumacher/ckn6z3j8i0ckn17uumt522ayv",
	accessToken:
		"pk.eyJ1IjoieXVyaWtvLXNjaHVtYWNoZXIiLCJhIjoiY2ttNDVoemgyMDFjcDJxdXM5cWx5d3FzdiJ9.Ajc4ZM1IbKLbRPSkrBJNrA",
	showMarkers: false,
	// markerColor: '#3FB1CE',
	theme: "dark",
	use3dTerrain: false,
	title: "",
	subtitle: "",
	// byline: "By Yuriko Schumacher",
	footer: "",
	chapters: [
		{
			id: "step-1",
			alignment: "right",
			hidden: false,
			title: "The night of May 31",
			description:
				"That night, <span class='highlighter pink-highlighter'>peaceful protests</span> ended a little before 9 p.m. Throughout the night, Boston Police Department <span class='highlighter blue-highlighter'>posted a series of tweets,</span> asking for people to go home.<br><br><span class='highlighter gray-highlighter'>Trains were bypassing stations</span> around the downtown area.<br><br>The chart above shows the timeline of these and timestamps of <span class='highlighter yellow-highlighter'>BPD’s body camera footage</span> made available.",
			location: {
				center: [-71.03734, 42.35052],
				zoom: 12,
				pitch: 0,
				bearing: 0,
			},
			mapAnimation: "flyTo",
			rotateAnimation: false,
			callback: "",
			onChapterEnter: [
				// {
				//     layer: 'layer-name',
				//     opacity: 1,
				//     duration: 5000
				// }
			],
			onChapterExit: [
				// {
				//     layer: 'layer-name',
				//     opacity: 0
				// }
			],
		},
		{
			id: "step-2",
			alignment: "right",
			hidden: false,
			title: "",
			description:
				"There were a few demonstrations organized on that day. One of them, organized by Black Boston, marched from Nubian Square up to the State House.<br><br>Hodan Hashi, a founder of Black Boston, said more than 20,000 people were estimated to participate.",
			location: {
				center: [-71.03734, 42.35052],
				zoom: 12,
				pitch: 0,
				bearing: 0,
			},
			mapAnimation: "flyTo",
			rotateAnimation: false,
			callback: "",
			onChapterEnter: [],
			onChapterExit: [],
		},
	],
};
