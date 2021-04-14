function Timeline() {
	this.selection = function (selection) {
		this._selection = selection;
		return this;
	};

	this.size = function (size) {
		this._size = size;
		return this;
	};

	this.margins = function (margins) {
		this._margins = margins;

		if (!this._size) {
			console.error("Setup size before margins");
			return;
		}
		if (!this._selection) {
			console.error("Setup selection before margins");
			return;
		}

		this._containerSize = {
			w: this._size.w - margins.l - margins.r,
			h: this._size.h - margins.t - margins.b,
		};
		this._selection.attr(
			"transform",
			`translate(${margins.l}, ${margins.t})`
		);
		return this;
	};

	this.data = function (data) {
		this._data = data;
		return this;
	};

	this.draw = function () {
		const xScale = d3
			.scaleTime()
			.domain([
				d3.min(this._data, (d) => d.parsedTime),
				parseTime("2020-06-01T00:00:00Z"),
			])
			.range([0, this._containerSize.w]);

		const yScale = d3
			.scaleBand()
			.domain(categories)
			.range([0, this._containerSize.h]);

		const colorScale = d3
			.scaleOrdinal()
			.domain(categories)
			.range(["#ff29c9", "#7df9ff", "#ffff00"]);

		let dotSel = this._selection.selectAll("a").data(this._data);

		dotSel
			.join("a")
			.attr("href", (d) => {
				if (d.category === "BPD Tweets/News") {
					return d.src;
				}
			})
			.attr("target", (d) => {
				if (d.category === "BPD Tweets/News") {
					return "_blank";
				}
			})
			.append("circle")
			.attr("id", (d, i) => i)
			.attr("data-category", (d) => d.category)
			.attr("class", (d) => `${d.step}-circles`)
			.attr("cx", (d) => xScale(d.parsedTime))
			.attr("cy", (d) => yScale(d.category))
			.attr("r", 5)
			.attr("fill", (d) => colorScale(d.category))
			.attr("fill-opacity", 0.3);

		this.drawAxes(xScale, yScale);
	};

	this.drawAxes = function (xScale, yScale) {
		this.drawAxisX(xScale);
		this.drawHorizontallines(yScale);
	};

	this.drawAxisX = function (xScale) {
		const xAxis = d3
			.axisBottom(xScale)
			.tickFormat(d3.timeFormat("%I:%M %p"));
		const axisG = this._selection
			.append("g")
			.classed("x-axis", true)
			.call(xAxis)
			.attr("transform", `translate(0, ${this._containerSize.h})`);

		axisG.call(xAxis);
	};

	this.drawHorizontallines = function (yScale) {
		categories.forEach((d) => {
			this._selection
				.append("g")
				.classed("horizontal-lines", true)
				.append("line")
				.attr("x1", 0)
				.attr("y1", yScale(d))
				.attr("x2", this._containerSize.w)
				.attr("y2", yScale(d))
				.attr("stroke", "white")
				.attr("stroke-width", 1);
		});
	};
}
