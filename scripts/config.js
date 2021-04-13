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
				"<span class='highlighter pink-highlighter'>Peaceful protests</span> ended a little before 9 p.m.<br><br>Throughout the night, Boston Police Department posted <span class='highlighter blue-highlighter'>a series of tweets,</span> asking for people to go home.<br><br>The chart above shows the timeline of these and the <span class='highlighter yellow-highlighter'>BPD’s body camera footage</span>.",
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
				"Organizers of one march, <a href='https://www.blackboston.org/' target='_blank'>Black Boston</a>, estimate that more than 20,000 people marched from Nubian Square to the State House.<br><br>At 6:30 p.m., <span class='highlighter pink-highlighter'>the crowds started heading north.</span><br><br>About the same time, <span class='highlighter blue-highlighter'>BPD tweets asked them</span> for a safe and peaceful demonstration.",
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
