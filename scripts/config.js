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
			callback: "firstStep",
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
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-5",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-6-1-1",
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
				'At 9:21 p.m. on Tremont Street, an officer says, <span class="highlighter yellow-highlighter">"Start spraying the fuckers."</span>',
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
					layer: "step-6-1-1",
					opacity: 0,
					duration: 1,
				},
			],
			onChapterExit: [],
		},
		{
			id: "step-6-1-1",
			alignment: "right",
			title: "",
			description:
				'At 9:23 p.m., a large group of officers is seen approaching the protesters on Tremont Street, with one officer <span class="highlighter yellow-highlighter">widely spraying the protesters.</span>',
			location: {
				center: [-71.06333, 42.35503],
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
					layer: "step-6-1-1",
					opacity: 1,
					duration: 1,
				},
				{
					layer: "step-6-1-2",
					opacity: 0,
					duration: 1,
				},
			],
			onChapterExit: [],
		},
		{
			id: "step-6-1-2",
			alignment: "right",
			title: "",
			description:
				'At 9:26 p.m., multiple bike patrol officers <span class="highlighter yellow-highlighter">aggressively run towards a protester</span> who was throwing things at police.',
			location: {
				center: [-71.06352, 42.35476],
				zoom: 18.11,
				pitch: 70,
				bearing: -140.71,
			},
			mapAnimation: "flyTo",
			rotateAnimation: false,
			callback: "stepFn",
			onChapterEnter: [
				{
					layer: "step-6-1-1",
					opacity: 0,
					duration: 1,
				},
				{
					layer: "step-6-1-2",
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
					layer: "step-6-1-2",
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
				'At 9:48 p.m. just north of Downtown Crossing station, an officer is seen <span class="highlighter yellow-highlighter">punching a male protester in the stomach.</span>',
			location: {
				center: [-71.05958, 42.35645],
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
				'At 9:52 p.m. on Washington Street., an officer with a pepper spray on his hand says, <span class="highlighter yellow-highlighter">"I wanna hit this asshole."</span><br><br>Around 10 p.m., BPD tweets that protestors "have <span class="highlighter blue-highlighter"><a href="https://twitter.com/bostonpolice/status/1267274567388626947" target="_blank">surrendered the moral high ground."</a></span>',
			location: {
				center: [-71.05886, 42.35708],
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
				'Some more intense moments are captured on the camera. At 10:08 p.m., an officer approached the crowd and <span class="highlighter yellow-highlighter">pushed a protester down with a nightstick.</span>',
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
				'At 10:20 p.m., around Downtown Crossing station, an officer talks about <span class="highlighter yellow-highlighter">using a police vehicle to attack demonstrators.</span><br><br>BPD again posted two consecutive tweets, stressing the <span class="highlighter blue-highlighter"><a href="https://twitter.com/bostonpolice/status/1267282825881010176" target="_blank">"officers are fighting to protect"</a></span> the city.',
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
				'At 10:44 p.m., footage captured in front of Park Street station exit showed <span class="highlighter yellow-highlighter">an officer pushing a female protester down with a nightstick.</span>',
			location: {
				center: [-71.06228, 42.35645],
				zoom: 18.11,
				pitch: 70,
				bearing: -24.0,
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
					layer: "step-6-1-1",
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
					layer: "bodycam-all",
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
			callback: "exploreMoreVideos",
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
				{
					layer: "bodycam-all",
					opacity: 0.2,
					duration: 1,
				},
				{
					layer: "step-12",
					opacity: 0,
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
